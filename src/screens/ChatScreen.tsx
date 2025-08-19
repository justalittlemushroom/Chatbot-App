import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { listenToMessages, saveMessage, deleteMessage, getConversation } from '../services/conversations';
import Profile from '../components/Profile';
import MessageMenu from '../components/MessageMenu';
import * as Clipboard from 'expo-clipboard';

const screenWidth = Dimensions.get('window').width;

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route }: any) {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [conversationTitle, setConversationTitle] = useState('New Conversation');

  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const { conversationId } = (route.params as { conversationId: string });
  const [aiTyping, setAiTyping] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
      const getConversationName = async () => {
        try {
          const conversation = await getConversation(conversationId) as any;
          setConversationTitle(conversation.title);
          
        } catch (error) {
          console.error('Error Loading Conversation Name:', error);
          setConversationTitle('New Conversation');
        }
      };
      
    getConversationName();
      
    const unsubscribe = listenToMessages(conversationId, setMessages);

    return () => unsubscribe();
  }, [conversationId]);

  const handleUserReply = async () => {
    if (!inputText.trim()) return;

    try {
      setLoading(true);
      setAiTyping(true);
    
      await saveMessage(conversationId, inputText.trim(), 'user');
      
      const userMessage = inputText.trim();
      setInputText('');

      const conversationContext = messages.map(msg => 
        `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}`
      ).join('\n');
      
      const fullContext = conversationContext + `\nUser: ${userMessage}`;
      
      const AI_SERVER_URL = process.env.EXPO_PUBLIC_AI_SERVER_URL || 'http://localhost:3001';

      const response = await fetch(`${AI_SERVER_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: fullContext
        })
      });

      const aiData = await response.json();
      
      if (aiData.response) {
        await saveMessage(conversationId, aiData.response, 'ai');
      }

      setAiTyping(false);
    } catch (error) {
      console.error('Error Sending Message:', error);
      alert("Message Failed to Send!");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageLongPress = (message: any, event: any) => {
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

  const handleDeleteMessage = async (messageId: string) => {
    try {
      setShowMenu(false);
      await deleteMessage(conversationId, messageId);
    } catch(error: any) {
      console.error('Error Deleting Message:', error);
      alert("Failed to Delete Message");
    }
  }

  return (
    <View style={styles.main_container}>
      <View style={styles.top_container}>
        <Text style={styles.h1} onPress={() => navigation.navigate('Home')}>{conversationTitle}</Text>
        <Profile />
      </View>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        {messages.map(message => (
          <TouchableOpacity
            key={message.id}
            onPress={() => setShowMenu(false)}
            onLongPress={(event) => handleMessageLongPress(message, event)}
            activeOpacity={0.7}
          >
            <Text style={message.role === 'user' ? styles.user_text : styles.ai_text}>
              {message.content}
            </Text>
          </TouchableOpacity>
        ))}
        {aiTyping && (<Text style={styles.ai_text}>AI is Thinking...</Text>)}
        <MessageMenu 
          visible={showMenu}
          position={menuPosition}
          message={selectedMessage}
          onClose={() => setShowMenu(false)}
          onCopy={handleCopyMessage}
          onDelete={handleDeleteMessage}
        />
      </ScrollView>
      <View style={styles.reply_container}>
        <TextInput placeholder="Reply..." style={styles.chat_input}  value={inputText} onChangeText={setInputText} multiline onSubmitEditing={loading || aiTyping ? undefined : handleUserReply} editable={!loading && !aiTyping}/>
        <TouchableOpacity onPress={() => handleUserReply()} disabled={loading || !inputText.trim() || aiTyping}><Ionicons name="arrow-up-circle-outline" size={32} style={[styles.send_icon, (loading || !inputText.trim()) && styles.send_icon_disabled]} /></TouchableOpacity>
      </View>
    </View>
  );
}