import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ConversationPreview from '../components/ConversationPreview';
import { Ionicons } from '@expo/vector-icons';
import Profile from '../components/Profile';
import { loadUserConversations, createConversation } from '../services/conversations';
import { useEffect, useState } from 'react';
import { auth } from '../services/firebase';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [conversations, setConversations] = useState<any[]>([]);
  
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const userConversations = await loadUserConversations();
        setConversations(userConversations);
      } catch (error) {
        console.error('Error Loading Conversations');
      }
    };
  
    loadConversations();
  }, []);

  const handleConversationPress = (conversationId: string) => {
    navigation.navigate('Chat', { conversationId });
  };

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
          />
        )}
      </ScrollView>
      <View style={styles.bottom_container}><TouchableOpacity onPress={() => handleNewChat()}><Ionicons name="add-circle-outline" size={48} style={styles.new_chat_icon} /></TouchableOpacity></View>
    </View>
  );
}