import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
interface ConversationPreviewProps {
  conversation: {
    id: string;
    title: string;
    updatedAt: any;
  };
  onPress: (conversationId: string) => void;
}

export const ConversationPreview: React.FC<ConversationPreviewProps> = ({conversation, onPress}) => {
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Just Now';
    
    const now = new Date();
    const messageTime = timestamp.toDate();
    const diffMs = now.getTime() - messageTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMinutes < 1) {
      return 'Just Now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} Minutes Ago`;
    } else if (diffHours < 24) {
      return `${diffHours} Hours Ago`;
    } else {
      return `${diffDays} Days Ago`;
    }
  };

  return (
    <TouchableOpacity style={styles.preview_container} onPress={() => onPress(conversation.id)}>
      <Text style={styles.h2}>{conversation.title}</Text>
      <Text style={styles.subtext}>
        Last Updated {formatTimestamp(conversation.updatedAt)}
      </Text>
    </TouchableOpacity>
  );
};

export default ConversationPreview;