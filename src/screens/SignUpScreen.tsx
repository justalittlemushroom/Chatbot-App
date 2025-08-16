import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ThirdPartyAuth from '../components/ThirdPartyAuth';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  return (
    <View style={styles.auth_container}>
      <Text style={styles.h1}>My Chatbot</Text>
      <TextInput placeholder="Username" style={styles.username_input}/>
      <TextInput placeholder="Email" style={styles.email_input}/>
      <TextInput placeholder="Password" style={styles.password_input}/>
      <TextInput placeholder="Confirm Password" secureTextEntry={true} style={styles.password_input}/>
      <View style={styles.login_signup}>
        <TouchableOpacity style={styles.auth_button} onPress={() => navigation.navigate('Home')}><Text style={styles.auth_button_text}>Sign Up</Text></TouchableOpacity>
      </View>
      <ThirdPartyAuth />
    </View>
  );
}