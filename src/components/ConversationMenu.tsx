import { View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from 'react';
import { renameConversation } from '../services/conversations';

export const ConversationMenu: React.FC<{
  visible: boolean;
  position: { x: number; y: number };
  conversation: any;
  onClose: () => void;
  onDelete: (messageId: string) => void;
}> = ({ visible, position, conversation, onClose, onDelete }) => {
  
  if (!visible) return null;

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  
  const handleSave = async () => {
    try {
      if (newTitle.trim()) {
        await renameConversation(conversation.id, newTitle.trim());
        setShowRenameModal(false);
        setNewTitle('');
        onClose()
      }
    } catch (error) {
      console.error('Error Renaming Conversation:', error);
      alert('Failed to Rename Conversation');
    }
  };

  const handleCancel = () => {
    setShowRenameModal(false);
    setNewTitle('');
    onClose()
  };
  
  return (
    <>
      <TouchableOpacity style={styles.main_container} onPress={onClose}/>
      <View style={[styles.message_menu, {position: 'absolute', left: position.x, top: position.y}]}>
        <TouchableOpacity onPress={() => {
          setNewTitle(conversation.title); 
          setShowRenameModal(true);
          }}>
          <Text style={styles.menu_options_text}>Rename</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(conversation.id)}>
          <Text style={styles.menu_options_text}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showRenameModal}>
        <View style={styles.modal_overlay}>
          <View style={styles.modal_container}>
            <TextInput placeholder="New Name" value={newTitle} onChangeText={setNewTitle} style={styles.modal_text}/>
            <View style={styles.modal_buttons_container}>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.modal_buttons_text}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.modal_buttons_text}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ConversationMenu;