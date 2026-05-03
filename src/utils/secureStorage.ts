import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEY = 'token';

export const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(KEY);
  }
  return await SecureStore.getItemAsync(KEY);
};

export const setToken = async (token: string) => {
  if (Platform.OS === 'web') {
    return localStorage.setItem(KEY, token);
  }
  return await SecureStore.setItemAsync(KEY, token);
};

export const deleteToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.removeItem(KEY);
  }
  return await SecureStore.deleteItemAsync(KEY);
};