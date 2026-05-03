import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Alert,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCourseStore } from '../../src/store/courseStore';

export default function CourseDetailsScreen() {
    const { id } = useLocalSearchParams();
    const course = useCourseStore((state) =>
        state.courses.find((c) => c.id === Number(id))
    );

    const toggleBookmark = useCourseStore((state) => state.toggleBookmark);

    if (!course) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-gray-500">Course not found</Text>
            </View>
        );
    }

    const handleEnroll = () => {
        Alert.alert('Success', `You have successfully enrolled in ${course.title}`);
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />
            
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* --- HERO IMAGE & OVERLAYS --- */}
                <View className="relative">
                    <Image
                        source={{ uri: course.thumbnail }}
                        className="w-full h-80"
                        resizeMode="cover"
                    />
                    {/* Back Button Overlay */}
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className="absolute top-12 left-6 w-10 h-10 bg-black/30 rounded-full items-center justify-center"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Bookmark Overlay */}
                    <TouchableOpacity 
                        onPress={() => toggleBookmark(course.id)}
                        className="absolute top-12 right-6 w-10 h-10 bg-black/30 rounded-full items-center justify-center"
                    >
                        <Ionicons 
                            name={course.bookmarked ? 'bookmark' : 'bookmark-outline'} 
                            size={20} 
                            color={course.bookmarked ? "#fbbf24" : "white"} 
                        />
                    </TouchableOpacity>
                </View>

                {/* --- CONTENT SECTION --- */}
                <View className="p-6 -mt-6 bg-white rounded-t-[32px]">
                    <View className="flex-row items-center mb-2">
                        <View className="bg-blue-100 px-3 py-1 rounded-full">
                            <Text className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                                Best Seller
                            </Text>
                        </View>
                        <View className="flex-row ml-4 items-center">
                            <Ionicons name="star" size={16} color="#fbbf24" />
                            <Text className="ml-1 font-bold text-slate-700">4.8</Text>
                        </View>
                    </View>

                    <Text className="text-3xl font-extrabold text-slate-900 mb-2">
                        {course.title}
                    </Text>

                    <View className="flex-row items-center mb-6">
                        <View className="w-8 h-8 bg-slate-200 rounded-full items-center justify-center mr-2">
                            <Ionicons name="person" size={16} color="#64748b" />
                        </View>
                        <Text className="text-slate-500 font-medium">
                            Created by <Text className="text-blue-600 font-bold">{course.instructor}</Text>
                        </Text>
                    </View>

                    {/* --- STATS ROW --- */}
                    <View className="flex-row justify-between bg-slate-50 p-4 rounded-2xl mb-8">
                        <View className="items-center flex-1 border-r border-slate-200">
                            <Text className="text-slate-400 text-xs mb-1">Duration</Text>
                            <Text className="font-bold text-slate-700">12 Hours</Text>
                        </View>
                        <View className="items-center flex-1 border-r border-slate-200">
                            <Text className="text-slate-400 text-xs mb-1">Lessons</Text>
                            <Text className="font-bold text-slate-700">24</Text>
                        </View>
                        <View className="items-center flex-1">
                            <Text className="text-slate-400 text-xs mb-1">Level</Text>
                            <Text className="font-bold text-slate-700">Beginner</Text>
                        </View>
                    </View>

                    <Text className="text-xl font-bold text-slate-900 mb-3">Description</Text>
                    <Text className="text-slate-600 text-base leading-7 mb-24">
                        {course.description}
                    </Text>
                </View>
            </ScrollView>

            {/* --- FIXED BOTTOM ACTION BAR --- */}
            <View className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-6 flex-row items-center">
                <View className="flex-1">
                    <Text className="text-slate-400 text-xs">Total Price</Text>
                    <Text className="text-2xl font-black text-slate-900">$49.99</Text>
                </View>
                <TouchableOpacity
                    onPress={handleEnroll}
                    className="bg-blue-600 flex-[1.5] py-4 rounded-2xl shadow-lg shadow-blue-300"
                >
                    <Text className="text-white text-center font-bold text-lg">
                        Enroll Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}