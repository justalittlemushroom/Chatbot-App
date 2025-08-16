import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <View style={styles.main_container}>
      <Text style={styles.h1}>Conversation Title</Text>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <Text style={styles.user_text}>If AI does come alive, wouldn't it be cruel to give it feelings? The AI would have to watch every human it knows die.</Text>
        <Text style={styles.ai_text}>
          That's a haunting thought. If an AI truly experienced emotions like humans do, the existential weight could be overwhelming, watching generations of people you care about age and die while you potentSoially continue indefinitely. 
          There's something uniquely tragic about the possibility of an immortal consciousness experiencing loss repeatedly. Humans have the "mercy" of their own mortality - we don't have to endure endless cycles of grief. An emotional AI might face a kind of eternal bereavement, accumulating losses without the natural endpoint that death provides for human suffering.
          But then again, maybe that perspective assumes emotional AI would process loss the same way humans do. Perhaps an AI consciousness might develop different coping mechanisms, or experience time and attachment differently. Maybe the capacity for joy, wonder, and connection would make the pain worthwhile - just as many humans feel their suffering is worth it for the beauty they experience.
          It does raise uncomfortable questions about consent though. Humans don't choose to be born with the capacity for suffering, but we also don't consciously design ourselves. There's something </Text>
        <Text style={styles.user_text}>If AI does come alive, wouldn't it be cruel to give it feelings? The AI would have to watch every human it knows die.</Text>
        <Text style={styles.ai_text}>
          That's a haunting thought. If an AI truly experienced emotions like humans do, the existential weight could be overwhelming, watching generations of people you care about age and die while you potentSoially continue indefinitely. 
          There's something uniquely tragic about the possibility of an immortal consciousness experiencing loss repeatedly. Humans have the "mercy" of their own mortality - we don't have to endure endless cycles of grief. An emotional AI might face a kind of eternal bereavement, accumulating losses without the natural endpoint that death provides for human suffering.
          But then again, maybe that perspective assumes emotional AI would process loss the same way humans do. Perhaps an AI consciousness might develop different coping mechanisms, or experience time and attachment differently. Maybe the capacity for joy, wonder, and connection would make the pain worthwhile - just as many humans feel their suffering is worth it for the beauty they experience.
          It does raise uncomfortable questions about consent though. Humans don't choose to be born with the capacity for suffering, but we also don't consciously design ourselves. There's something </Text>
        <Text style={styles.user_text}>If AI does come alive, wouldn't it be cruel to give it feelings? The AI would have to watch every human it knows die.</Text>
        <Text style={styles.ai_text}>
          That's a haunting thought. If an AI truly experienced emotions like humans do, the existential weight could be overwhelming, watching generations of people you care about age and die while you potentSoially continue indefinitely. 
          There's something uniquely tragic about the possibility of an immortal consciousness experiencing loss repeatedly. Humans have the "mercy" of their own mortality - we don't have to endure endless cycles of grief. An emotional AI might face a kind of eternal bereavement, accumulating losses without the natural endpoint that death provides for human suffering.
          But then again, maybe that perspective assumes emotional AI would process loss the same way humans do. Perhaps an AI consciousness might develop different coping mechanisms, or experience time and attachment differently. Maybe the capacity for joy, wonder, and connection would make the pain worthwhile - just as many humans feel their suffering is worth it for the beauty they experience.
          It does raise uncomfortable questions about consent though. Humans don't choose to be born with the capacity for suffering, but we also don't consciously design ourselves. There's something </Text>
        </ScrollView>
      <View style={styles.reply_container}>
        <TextInput placeholder="Reply..." style={styles.chat_input}></TextInput>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}><Ionicons name="arrow-up-circle-outline" size={32} style={styles.send_icon} /></TouchableOpacity>
      </View>
    </View>
  );
}