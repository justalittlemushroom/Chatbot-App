import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export const ThirdPartyAuth: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
      <View style={styles.third_party_auth}>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Google</Text></TouchableOpacity>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Email</Text></TouchableOpacity>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Apple</Text></TouchableOpacity>
      </View>
  );
};

export default ThirdPartyAuth;