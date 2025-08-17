import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getUser } from '../services/auth';
import { Ionicons } from '@expo/vector-icons';
import { User } from 'firebase/auth';
import { logOut } from '../services/auth';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const Profile: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogOut = () => {
    try {
      logOut();
      alert("Successfully logged out!")
      navigation.navigate('Login')
    } catch (error: any) {
      alert("Failed to log out")
    }
  }

  return (
      <View style={styles.profile_settings_container}>
        <View style={styles.profile_container}>
            <Text style={styles.h2}>{user?.displayName || 'User'}</Text>
            <Ionicons name="person-outline" size={20} style={styles.profile_icon} />
        </View>
        <TouchableOpacity><Ionicons name="exit-outline" onPress={() => handleLogOut()} size={32} style={styles.log_out_icon} /></TouchableOpacity>
      </View>
  );
};

export default Profile;