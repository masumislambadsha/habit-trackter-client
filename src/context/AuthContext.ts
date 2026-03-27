import { createContext } from "react";
import type { AuthContextValue } from "../types/app";

const defaultAuthContextValue: AuthContextValue = {
  createUser: async () => {
    throw new Error("AuthProvider is required to create a user.");
  },
  updateUserProfile: async () => {
    throw new Error("AuthProvider is required to update a profile.");
  },
  signInUser: async () => {
    throw new Error("AuthProvider is required to sign in.");
  },
  signInWithGoogle: async () => {
    throw new Error("AuthProvider is required to sign in with Google.");
  },
  signOutUser: async () => {
    throw new Error("AuthProvider is required to sign out.");
  },
  user: null,
  loading: true,
  setLoading: () => undefined,
};

export const AuthContext = createContext<AuthContextValue>(
  defaultAuthContextValue
);
