import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('token');
  return !!token;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};
