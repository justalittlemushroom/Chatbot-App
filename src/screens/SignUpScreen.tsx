import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ThirdPartyAuth from '../components/ThirdPartyAuth';
import { signUpWithEmail } from '../services/auth';
import { useState } from 'react';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        setConfirmPassword('');
        return;
      }
      await signUpWithEmail(username, email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      alert("Invalid email or password");
      setPassword('')
    }
  }

  return (
    <View style={styles.auth_container}>
      <Text style={styles.h1}>My Chatbot</Text>
      <TextInput placeholder="Display Name" value={username} onChangeText={setUsername} style={styles.username_input}/>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.email_input}/>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.password_input}/>
      <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} style={styles.password_input}/>
      <View style={styles.auth_buttons_container_vertical}>
        <TouchableOpacity style={styles.auth_button} onPress={() => handleSignUp()}><Text style={styles.auth_button_text}>Sign Up</Text></TouchableOpacity>
        <TouchableOpacity style={styles.auth_button} onPress={() => navigation.navigate('Login')}><Text style={styles.auth_button_text}>Return to Login</Text></TouchableOpacity>
      </View>
      <ThirdPartyAuth />
    </View>
  );
}