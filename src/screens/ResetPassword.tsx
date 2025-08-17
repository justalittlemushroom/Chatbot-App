import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { resetPassword } from '../services/auth';
import { useState } from 'react';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await resetPassword(email)
      alert('Email successfully sent!')
    } catch (error: any) {
      alert("Invalid email");
    }
  }

  return (
    <View style={styles.auth_container}>
      <Text style={styles.h1}>My Chatbot</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.email_input}/>
      <View style={styles.auth_buttons_container_vertical}>
        <TouchableOpacity style={styles.auth_button}  onPress={() => handleResetPassword()}><Text style={styles.auth_button_text}>Reset Password</Text></TouchableOpacity>
        <TouchableOpacity style={styles.auth_button} onPress={() => navigation.navigate('Login')}><Text style={styles.auth_button_text}>Return to Login</Text></TouchableOpacity>
      </View>
    </View>
  );
}