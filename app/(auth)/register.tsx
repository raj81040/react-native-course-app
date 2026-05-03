import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      // Dummy registration simulation
      Alert.alert('Success', 'Account created successfully');
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Registration Failed', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
          className="px-8"
        >
          {/* Header */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 bg-emerald-600 rounded-3xl items-center justify-center mb-4 shadow-lg shadow-emerald-200">
              <Text className="text-white text-4xl font-bold">+</Text>
            </View>
            <Text className="text-3xl font-extrabold text-slate-800">Create Account</Text>
            <Text className="text-slate-500 mt-2 text-center">
              Join us and start managing your tasks today
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            <View>
              <Text className="text-slate-600 mb-2 ml-1 font-medium">Username</Text>
              <TextInput
                placeholder="Choose a username"
                value={username}
                onChangeText={setUsername}
                className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-800 shadow-sm shadow-slate-100"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View>
              <Text className="text-slate-600 mb-2 ml-1 font-medium">Email Address</Text>
              <TextInput
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-800 shadow-sm shadow-slate-100"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View>
              <Text className="text-slate-600 mb-2 ml-1 font-medium">Password</Text>
              <TextInput
                placeholder="Create a strong password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-800 shadow-sm shadow-slate-100"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            activeOpacity={0.8}
            className="bg-emerald-600 rounded-2xl p-4 mt-8 shadow-md shadow-emerald-200"
          >
            <Text className="text-white text-center font-bold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Login Footer */}
          <View className="flex-row justify-center mt-8 mb-4">
            <Text className="text-slate-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text className="text-emerald-600 font-bold">Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}