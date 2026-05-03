import { Text } from '@react-navigation/elements';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { requestNotificationPermission } from '../src/utils/notifications';
import { getToken } from '../src/utils/secureStorage';


export default function Index() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if (token) {
        router.replace('/home');
      } else {
        router.replace('/(auth)/login');
      }
    };

    requestNotificationPermission();

    checkAuth();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      <Text>App is working 🚀</Text>
    </View>
  );
}