import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

export const MessageMenu: React.FC<{
  visible: boolean;
  position: { x: number; y: number };
  message: any;
  onClose: () => void;
  onDelete: (messageId: string) => void;
  onCopy: (content: string) => void;
}> = ({ visible, position, message, onClose, onDelete, onCopy }) => {
  
  if (!visible) return null;
  
  return (
    <>
      <TouchableOpacity style={styles.main_container} onPress={onClose}/>
      <View style={[styles.message_menu, {position: 'absolute', left: position.x, top: position.y}]}>
        <TouchableOpacity onPress={() => onCopy(message.content)}>
          <Text style={styles.menu_options_text}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(message.id)}>
          <Text style={styles.menu_options_text}>Delete</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MessageMenu;