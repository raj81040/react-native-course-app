import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            await login(username, password);
            router.replace('/home');
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                className="flex-1"
            >
                <View className="flex-1 justify-center px-8">
                    {/* Header Section */}
                    <View className="items-center mb-10">
                        <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center mb-4 shadow-lg shadow-blue-400">
                            <Text className="text-white text-4xl font-bold">G</Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-slate-800">Welcome Back</Text>
                        <Text className="text-slate-500 mt-2">Sign in to continue your journey</Text>
                    </View>

                    {/* Form Section */}
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-600 mb-2 ml-1 font-medium">Username</Text>
                            <TextInput
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={setUsername}
                                className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-800 shadow-sm shadow-slate-100"
                                autoCapitalize="none"
                                placeholderTextColor="#94a3b8"
                            />
                        </View>

                        <View>
                            <Text className="text-slate-600 mb-2 ml-1 font-medium">Password</Text>
                            <TextInput
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-800 shadow-sm shadow-slate-100"
                                placeholderTextColor="#94a3b8"
                            />
                        </View>
                    </View>

                    {/* Forgot Password Link */}
                    <TouchableOpacity className="items-end mt-3 mb-8">
                        <Text className="text-blue-600 font-medium">Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.7}
                        className={`rounded-2xl p-4 shadow-md ${loading ? 'bg-blue-400' : 'bg-blue-600'} shadow-blue-300`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white text-center font-bold text-lg">Sign In</Text>
                        )}
                    </TouchableOpacity>

                    {/* Register Footer */}
                    <View className="flex-row justify-center mt-10">
                        <Text className="text-slate-500">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text className="text-blue-600 font-bold">Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}