"use client"

import { createContext, useState, ReactNode, useContext, useEffect, FC } from 'react';
import { auth, signInWithGoogle, logout, fetchRole } from "../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";


type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);


type FCProps = { children?: ReactNode }

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRole = await fetchRole(user.uid);
        setRole(userRole);
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  function login() {
    return signInWithGoogle();
  }

  function logOut() {
    return logout();
  }

  const value: AuthContextType = {
    user,
    login,
    logout: logOut,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("AuthContext has no value")
  return context
}
