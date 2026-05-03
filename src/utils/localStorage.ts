import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveBookmarks = async (data: any) => {
  await AsyncStorage.setItem('bookmarks', JSON.stringify(data));
};

export const getBookmarks = async () => {
  const data = await AsyncStorage.getItem('bookmarks');
  return data ? JSON.parse(data) : [];
};