import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import type { AppProviderProps, AuthContextValue } from "../types/app";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (
    email: string,
    password: string,
    name: string,
    photoURL = ""
  ): Promise<User> => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(credential.user, {
      displayName: name,
      photoURL: photoURL || null,
    });
    return credential.user;
  };

  const signInUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = (): Promise<UserCredential> => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (
    displayName: string,
    photoURL: string | null = null
  ): Promise<void> => {
    if (!auth.currentUser) {
      return Promise.reject(new Error("No authenticated user available."));
    }
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const signOutUser = (): Promise<void> => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextValue = {
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
