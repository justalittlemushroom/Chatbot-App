import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { listenToMessages, loadMessages, saveMessage, deleteMessage } from '../services/conversations';
import Profile from '../components/Profile';
import MessageMenu from '../components/MessageMenu';
import * as Clipboard from 'expo-clipboard';

const screenWidth = Dimensions.get('window').width;

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route }: any) {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const { conversationId } = (route.params as { conversationId: string });

  const [showMenu, setShowMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadAndListenToMessages = async () => {
      try {
        const existingMessages = await loadMessages(conversationId);
        setMessages(existingMessages);
        
        const unsubscribe = listenToMessages(conversationId, (updatedMessages) => {
          setMessages(updatedMessages);
        });
        
        return () => {
          unsubscribe();
        };
        
      } catch (error) {
        console.error('Error Loading Messages:', error);
        alert("Messages Failed to Load");
      }
    };
  
  loadAndListenToMessages();
  }, [conversationId]);

  const handleUserReply = async () => {
    if (!inputText.trim()) return;

    try {
      setLoading(true);
    
      await saveMessage(conversationId, inputText.trim(), 'user');
      
      setInputText('');
      
      // 3. TODO: Get AI response and save it
    } catch (error) {
      console.error('Error Sending Message:', error);
      alert("Message Failed to Send!");
    } finally {
      setLoading(false);
    }
  }

  const handleMessagePress = (message: any, event: any) => {
    const { pageX, pageY } = event.nativeEvent;

    const menuWidth = 100;
    
    let adjustedX = pageX - 10;
    let adjustedY = pageY - 100;
    
    if (adjustedX + menuWidth + 68 > screenWidth) {
      adjustedX = adjustedX - menuWidth - 40;
    }

    setSelectedMessage(message);
    setMenuPosition({ x: adjustedX, y: adjustedY });
    setShowMenu(true);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      setShowMenu(false);
      await deleteMessage(conversationId, messageId);
    } catch(error: any) {
      console.error('Delete Failed:', error);
      alert("Failed to Delete Message");
    }
  }

  const handleCopyMessage = async (content: string) => {
  try {
    setShowMenu(false);
    await Clipboard.setStringAsync(content);
    alert("Copied!")
  } catch (error) {
    console.error('Copying Failed:', error);
    alert("Error Copying");
  }
};


  return (
    <View style={styles.main_container}>
      <View style={styles.top_container}>
        <Text style={styles.h1}>Conversation Title</Text>
        <Profile />
      </View>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        {messages.map(message => (
          <TouchableOpacity
            key={message.id}
            onPress={(event) => handleMessagePress(message, event)}
            activeOpacity={0.7}
          >
            <Text style={message.role === 'user' ? styles.user_text : styles.ai_text}>
              {message.content}
            </Text>
          </TouchableOpacity>
        ))}
        <MessageMenu 
          visible={showMenu}
          position={menuPosition}
          message={selectedMessage}
          onClose={() => setShowMenu(false)}
          onDelete={handleDeleteMessage}
          onCopy={handleCopyMessage}
        />
      </ScrollView>
      <View style={styles.reply_container}>
        <TextInput placeholder="Reply..." style={styles.chat_input}  value={inputText} onChangeText={setInputText} multiline onSubmitEditing={handleUserReply}/>
        <TouchableOpacity onPress={() => handleUserReply()} disabled={loading || !inputText.trim()}><Ionicons name="arrow-up-circle-outline" size={32} style={[styles.send_icon, (loading || !inputText.trim()) && styles.send_icon_disabled]} /></TouchableOpacity>
      </View>
    </View>
  );
}