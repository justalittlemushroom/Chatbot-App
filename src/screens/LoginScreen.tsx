import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ThirdPartyAuth from '../components/ThirdPartyAuth';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <View style={styles.auth_container}>
      <Text style={styles.h1}>My Chatbot</Text>
      <TextInput placeholder="Email" style={styles.email_input}/>
      <View style={styles.password}>
        <TextInput placeholder="Password" secureTextEntry={true} style={styles.password_input}/>
        <Text style={styles.subtext}>Forgot Your Password?</Text>
      </View>
      <View style={styles.login_signup}>
        <TouchableOpacity style={styles.auth_button}><Text style={styles.auth_button_text}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.auth_button} onPress={() => navigation.navigate('SignUp')}><Text style={styles.auth_button_text}>Sign Up</Text></TouchableOpacity>
      </View>
      <ThirdPartyAuth />
    </View>
  );
}