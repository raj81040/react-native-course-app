import { Ionicons } from '@expo/vector-icons'; // Built-in with Expo
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../src/store/authStore';
import { scheduleReminderNotification } from '../src/utils/notifications';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  useEffect(() => {
    scheduleReminderNotification();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 px-6">

        {/* --- HEADER SECTION --- */}
        <View className="flex-row justify-between items-center mt-8 mb-8">
          <View>
            <Text className="text-gray-500 text-lg">Hello,</Text>
            <Text className="text-3xl font-bold text-slate-900">
              {user?.firstName || 'Learner'} 👋
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"
          >
            <Ionicons name="person" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {/* --- WELCOME CARD --- */}
        <View className="bg-blue-600 rounded-3xl p-6 mb-8 shadow-lg shadow-blue-300">
          <Text className="text-white text-xl font-bold mb-2">Ready to learn?</Text>
          <Text className="text-blue-100 mb-4">You have 3 courses in progress. Keep up the great work!</Text>
          <TouchableOpacity
            onPress={() => router.push('/courses')}
            className="bg-white self-start px-4 py-2 rounded-lg"
          >
            <Text className="text-blue-600 font-bold">Continue Learning</Text>
          </TouchableOpacity>
        </View>

        {/* --- ACTION GRID --- */}
        <Text className="text-xl font-bold text-slate-800 mb-4">Quick Actions</Text>

        <View className="flex-row flex-wrap justify-between">
          {/* Profile Card */}
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            className="bg-white w-[48%] p-5 rounded-2xl mb-4 items-center shadow-sm"
          >
            <View className="bg-purple-100 p-3 rounded-full mb-3">
              <Ionicons name="settings-outline" size={24} color="#9333ea" />
            </View>
            <Text className="font-semibold text-slate-700">My Profile</Text>
          </TouchableOpacity>

          {/* Courses Card */}
          <TouchableOpacity
            onPress={() => router.push('/courses')}
            className="bg-white w-[48%] p-5 rounded-2xl mb-4 items-center shadow-sm"
          >
            <View className="bg-green-100 p-3 rounded-full mb-3">
              <Ionicons name="book-outline" size={24} color="#16a34a" />
            </View>
            <Text className="font-semibold text-slate-700">Catalog</Text>
          </TouchableOpacity>

          {/* Settings Card */}
          <TouchableOpacity
            onPress={() => Alert.alert("Notifications", "You have no new alerts at this time.")}
            className="bg-white w-[48%] p-5 rounded-2xl mb-4 items-center shadow-sm"
          >
            <View className="bg-orange-100 p-3 rounded-full mb-3">
              <Ionicons name="notifications-outline" size={24} />
              {/* Red dot badge if there are alerts */}
              <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </View>
            <Text className="font-semibold text-slate-700">Alerts</Text>
          </TouchableOpacity>

          {/* Logout Card */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white w-[48%] p-5 rounded-2xl mb-4 items-center shadow-sm"
          >
            <View className="bg-red-100 p-3 rounded-full mb-3">
              <Ionicons name="log-out-outline" size={24} color="#dc2626" />
            </View>
            <Text className="font-semibold text-red-600">Logout</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}