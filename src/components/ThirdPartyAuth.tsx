import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

export const ThirdPartyAuth: React.FC = () => {
  return (
      <View style={styles.third_party_auth}>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Google</Text></TouchableOpacity>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Email</Text></TouchableOpacity>
      </View>
  );
};

export default ThirdPartyAuth;