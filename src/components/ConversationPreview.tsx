import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export const ConversationPreview: React.FC = () => {
  return (
      <View style={styles.preview_container}>
        <Text style={styles.h2}>Conversation Title</Text>
        <Text style={styles.subtext}>Last Updated 2 Hours Ago</Text>
      </View>
  );
};

export default ConversationPreview;