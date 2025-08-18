import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ConversationPreview from '../components/ConversationPreview';
import { Ionicons } from '@expo/vector-icons';
import Profile from '../components/Profile';
import { createConversation, deleteConversation, renameConversation, listenToConversations } from '../services/conversations';
import { useEffect, useState } from 'react';
import ConversationMenu from '../components/ConversationMenu';

const screenWidth = Dimensions.get('window').width;

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [conversations, setConversations] = useState<any[]>([]);
  
  const [showMenu, setShowMenu] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = listenToConversations(setConversations);
    
    return () => unsubscribe();
  }, []);

  const handleConversationPress = (conversationId: string) => {
    navigation.navigate('Chat', { conversationId });
  };

  const handleConversationLongPress = (conversation: any, event: any) => {
    const { pageX, pageY } = event.nativeEvent;

    const menuWidth = 100;
    
    let adjustedX = pageX - 10;
    let adjustedY = pageY - 100;
    
    if (adjustedX + menuWidth + 68 > screenWidth) {
      adjustedX = adjustedX - menuWidth - 40;
    }

    setSelectedConversation(conversation);
    setMenuPosition({ x: adjustedX, y: adjustedY });
    setShowMenu(true);
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      setShowMenu(false);
      await deleteConversation(conversationId);
    } catch(error: any) {
      console.error('Error Deleting Conversation:', error);
      alert("Failed to Delete Conversation");
    }
  }

  const handleNewChat = async () => {
    try {
      const conversationId = await createConversation();
      
      navigation.navigate('Chat', { conversationId });
      
    } catch (error) {
      console.error('Error Creating New Chat:', error);
      alert("Error Creating New Chat");
    }
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.top_container}>
        <Text style={styles.h1}>All Chats</Text>
        <Profile />
      </View>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        {conversations.map(conversation => 
          <ConversationPreview 
            key={conversation.id}
            conversation={conversation}
            onPress={handleConversationPress}
            onLongPress={handleConversationLongPress}
          />
        )}
        <ConversationMenu 
          visible={showMenu}
          position={menuPosition}
          conversation={selectedConversation}
          onClose={() => setShowMenu(false)}
          onDelete={handleDeleteConversation}
        />
      </ScrollView>
      <View style={styles.bottom_container}><TouchableOpacity onPress={() => handleNewChat()}><Ionicons name="add-circle-outline" size={48} style={styles.new_chat_icon} /></TouchableOpacity></View>
    </View>
  );
}