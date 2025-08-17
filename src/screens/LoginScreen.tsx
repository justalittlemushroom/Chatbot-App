import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ThirdPartyAuth from '../components/ThirdPartyAuth';
import { signInWithEmail } from '../services/auth';
import { useState } from 'react';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmail(email, password);
      navigation.navigate('Home')
    } catch (error: any) {
      alert("Invalid Email/Password");
      setPassword('')
    }
  }

  return (
    <View style={styles.auth_container}>
      <Text style={styles.h1}>My Chatbot</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.email_input}/>
      <View style={styles.password}>
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.password_input}/>
        <Text style={styles.subtext} onPress={() => navigation.navigate('ResetPassword')}>Forgot Your Password?</Text>
      </View>
      <View style={styles.auth_buttons_container_horizontal}>
        <TouchableOpacity style={styles.auth_button}  onPress={() => handleLogin()}><Text style={styles.auth_button_text}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.auth_button} onPress={() => navigation.navigate('SignUp')}><Text style={styles.auth_button_text}>Sign Up</Text></TouchableOpacity>
      </View>
      {/* <ThirdPartyAuth /> */}
    </View>
  );
}