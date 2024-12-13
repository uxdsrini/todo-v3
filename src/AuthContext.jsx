import React, { createContext, useContext, useEffect, useState } from 'react';
    import { auth } from './firebase.js';
    import {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      sendPasswordResetEmail,
      onAuthStateChanged
    } from 'firebase/auth';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
        return unsubscribe;
      }, []);

      const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };

      const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      };

      const logout = () => {
        return signOut(auth);
      };

      const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
      };

      return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout, resetPassword }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      return useContext(AuthContext);
    };
