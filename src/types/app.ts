import type { User } from "firebase/auth";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface Habit {
  _id?: string;
  title?: string;
  description?: string;
  category?: string;
  image?: string;
  public?: boolean;
  streak?: number;
  reminderTime?: string;
  reminderEnabled?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  startDate?: string;
  frequency?: string;
  targetDays?: number;
  difficulty?: string;
  userEmail?: string;
  completionHistory?: Array<string | Date>;
  [key: string]: unknown;
}

export interface HabitStats {
  totalHabits?: number;
  completedToday?: number;
  longestStreak?: number;
  currentStreak?: number;
  completionRate?: number;
  totalCompletions?: number;
  weeklyProgress?: number;
  monthlyProgress?: number;
  [key: string]: unknown;
}

export interface AuthContextValue {
  createUser: (
    email: string,
    password: string,
    name: string,
    photoURL?: string
  ) => Promise<User>;
  updateUserProfile: (
    displayName: string,
    photoURL?: string | null
  ) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<unknown>;
  signInWithGoogle: () => Promise<unknown>;
  signOutUser: () => Promise<void>;
  user: User | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface ThemeContextValue {
  theme: string;
  isDark: boolean;
  toggleTheme: () => void;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface RouteGuardProps {
  children: ReactNode;
}

export interface HabitCardProps {
  habit: Habit;
}

export interface NavbarProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface ApiErrorPayload {
  message?: string;
  error?: string;
  [key: string]: unknown;
}

export interface ApiError extends Error {
  response?: {
    data?: ApiErrorPayload;
  };
}
