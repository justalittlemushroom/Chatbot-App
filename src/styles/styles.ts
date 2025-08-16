import { Dimensions, StyleSheet } from 'react-native';

const colors = {
    background: '#DEE6F2',
    text: '#3E3E3E',
    text_input: '#CCD8EB',
    subtext: '#3C6DFF',
    icon: '#3E84FE',
    third_party_auth: '#88B2F9',
    button: '#B1CCFA'
}

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.background,
    color: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    flexDirection: 'column',
    fontFamily: 'SortsMillGaudy',
  },
  h1: {
    fontFamily: 'KaiseiHarunoUmi',
    fontSize: 24,
    color: colors.text,
    lineHeight: 35,
    textAlign: 'center',
  },
  h2: {
    fontFamily: 'KaiseiHarunoUmi',
    fontSize: 16,
    color: colors.text,
    lineHeight: 23,
  },
  subtext: {
    fontFamily: 'Raleway',
    fontSize: 12,
    color: colors.subtext,
    lineHeight: 14,
  },
  username_input: { 
    backgroundColor: colors.text_input,
    padding: 4,
    width: Dimensions.get('window').width - 72,
    borderRadius: 4,
    fontFamily: 'Raleway',
    fontSize: 16,
    color: colors.text,
    lineHeight: 19,
  },
  email_input: { 
    backgroundColor: colors.text_input,
    padding: 4,
    width: Dimensions.get('window').width - 72,
    borderRadius: 4,
    fontFamily: 'Raleway',
    fontSize: 16,
    color: colors.text,
    lineHeight: 19,
  },
  password_input: { 
    backgroundColor: colors.text_input,
    padding: 4, 
    width: Dimensions.get('window').width - 72,
    gap: 10,
    borderRadius: 4,
    fontFamily: 'Raleway',
    fontSize: 16,
    color: colors.text,
    lineHeight: 19,
  },
  password: {
    width: Dimensions.get('window').width - 72,
    gap: 2,

  },
  auth_button: {
    width: 80,
    height: 28,
    margin: 16,
    borderRadius: 8, 
    backgroundColor: colors.button, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  auth_button_text: {
    fontFamily: 'Raleway',
    fontSize: 16,
    color: colors.text,
    lineHeight: 19,
    textAlign: 'center',
  },
  login_signup: {
    flexDirection: 'row',
    gap: 40,
  },
  third_party_auth: {
    paddingVertical: 36,
    gap: 24,
  },
  third_party_auth_button: {
    width: Dimensions.get('window').width - 72,
    height: 32,
    borderRadius: 8, 
    backgroundColor: colors.third_party_auth, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  third_party_auth_button_text: {
    fontFamily: 'Raleway',
    fontSize: 16,
    color: colors.text,
    lineHeight: 19,
    textAlign: 'center',
  },
})