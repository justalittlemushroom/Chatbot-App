import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ConversationPreview from '../components/ConversationPreview';
import { Ionicons } from '@expo/vector-icons';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <View style={styles.main_container}>
      <Text style={styles.h1}>All Chats</Text>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
        <ConversationPreview />
      </ScrollView>
      <View style={styles.bottom_container}><TouchableOpacity onPress={() => navigation.navigate('Chat')}><Ionicons name="add-circle-outline" size={48} style={styles.new_chat_icon} /></TouchableOpacity></View>
    </View>
  );
}