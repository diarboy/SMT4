import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../assets/lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek token dan session dari AsyncStorage saat inisialisasi
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedSession = await AsyncStorage.getItem('session');

        if (storedToken && storedSession) {
          setToken(storedToken);
          setSession(JSON.parse(storedSession));
          setIsAuthenticated(true); // Set to true if valid token and session are found
        } else {
          setIsAuthenticated(false); // Otherwise, set as false
        }
      } catch (error) {
        console.error('Error loadAuthData: ', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Fungsi login, simpan token dan session ke AsyncStorage
  const login = async (sessionData) => {
    try {
      await AsyncStorage.setItem('token', sessionData.access_token);
      await AsyncStorage.setItem('session', JSON.stringify(sessionData));
      setToken(sessionData.access_token);
      setSession(sessionData);
      setIsAuthenticated(true); // Update auth state to true on successful login
    } catch (error) {
      console.error('Error login: ', error);
    }
  };

  // Fungsi logout, hapus data autentikasi dari AsyncStorage
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('session');
      setToken(null);
      setSession(null);
      setIsAuthenticated(false); // Set to false on logout
      // Opsional: lakukan sign out pada supabase juga
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error logout: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, session, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
