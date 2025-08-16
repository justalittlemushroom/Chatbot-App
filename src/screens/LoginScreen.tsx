import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>My Chatbot</Text>
      <TextInput placeholder="Email" style={styles.email_input}/>
      <View style={styles.password}>
        <TextInput placeholder="Password" secureTextEntry={true} style={styles.password_input}/>
        <Text style={styles.subtext}>Forgot Your Password?</Text>
      </View>
      <View style={styles.login_signup}>
        <TouchableOpacity style={styles.auth_button}><Text style={styles.auth_button_text}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.auth_button}><Text style={styles.auth_button_text}>Sign Up</Text></TouchableOpacity>
      </View>
      <View style={styles.third_party_auth}>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Google</Text></TouchableOpacity>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Apple</Text></TouchableOpacity>
        <TouchableOpacity style={styles.third_party_auth_button}><Text style={styles.third_party_auth_button_text}>Continue With Email</Text></TouchableOpacity>
      </View>
    </View>
  );
}