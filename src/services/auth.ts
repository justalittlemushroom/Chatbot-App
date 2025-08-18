import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, signOut } from "firebase/auth";

export const signUpWithEmail = async (username: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export const getUser = () => {
  try {
    return auth.currentUser;
  } catch (error) {
    throw error;
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
}

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}