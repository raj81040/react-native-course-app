import { Ionicons } from '@expo/vector-icons'; // For the back button icon
import * as ImagePicker from 'expo-image-picker'; // Import this
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../src/store/authStore';

export default function ProfileScreen() {
    const user = useAuthStore((state) => state.user);
    const fetchProfile = useAuthStore((state) => state.fetchProfile);
    
    // Local state for the image URI if you want to show it immediately after picking
    const [selectedImage, setSelectedImage] = useState(user?.image);

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleImageUpdate = async () => {
        // 1. Request Permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need access to your gallery to update your profile picture.');
            return;
        }

        // 2. Launch Gallery
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri;
            setSelectedImage(newImageUri);
            // logic to upload newImageUri to your server goes here
            Alert.alert('Success', 'Profile picture updated!');
        }
    };

    if (!user) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white px-6 pt-12">
            {/* --- BACK BUTTON --- */}
            <TouchableOpacity 
                onPress={() => router.back()} 
                className="mb-4 w-10 h-10 justify-center"
            >
                <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>

            <View className="items-center mb-8">
                <Image
                    source={{ uri: selectedImage || user.image }}
                    className="w-32 h-32 rounded-full mb-4 bg-gray-200"
                />

                <TouchableOpacity
                    onPress={handleImageUpdate}
                    className="bg-blue-600 px-4 py-2 rounded-xl"
                >
                    <Text className="text-white font-medium">Update Picture</Text>
                </TouchableOpacity>

                <Text className="text-2xl font-bold mt-4">
                    {user.firstName} {user.lastName}
                </Text>
                <Text className="text-gray-500">{user.email}</Text>
            </View>

            {/* Section 1: Statistics */}
            <View className="bg-gray-100 rounded-2xl p-6 mb-6">
                <Text className="text-xl font-semibold mb-4">Statistics</Text>
                <View className="flex-row justify-between mb-3">
                    <Text>Courses Enrolled</Text>
                    <Text className="font-bold">8</Text>
                </View>
                <View className="flex-row justify-between mb-3">
                    <Text>Completed Courses</Text>
                    <Text className="font-bold">5</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text>Progress</Text>
                    <Text className="font-bold">68%</Text>
                </View>
            </View>

            {/* Section 2: Catalog Button */}
            <TouchableOpacity
                onPress={() => router.push('/courses')}
                className="bg-green-600 rounded-xl p-4 mb-10"
            >
                <Text className="text-white text-center font-semibold text-lg">
                    View Course Catalog
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}