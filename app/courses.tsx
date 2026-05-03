import { Ionicons } from '@expo/vector-icons';
import { LegendList } from '@legendapp/list';
import NetInfo from '@react-native-community/netinfo';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    RefreshControl,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCourseStore } from '../src/store/courseStore';

export default function CoursesScreen() {
    const {
        filteredCourses,
        loadCourses,
        searchCourses,
        toggleBookmark,
        loading,
    } = useCourseStore();

    const [search, setSearch] = useState('');
    const [offline, setOffline] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setOffline(!state.isConnected);
        });

        return unsubscribe;
    }, []);

    const handleSearch = (text: string) => {
        setSearch(text);
        searchCourses(text);
    };

    const renderCourseItem = useCallback(
        ({ item }: { item: any }) => (
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: '/course/[id]',
                        params: { id: item.id.toString() },
                    })
                }
                className="bg-gray-100 rounded-2xl p-4 mb-4"
                activeOpacity={0.8}
            >
                <Image
                    source={{ uri: item.thumbnail }}
                    className="w-full h-48 rounded-xl mb-4"
                    resizeMode="cover"
                />

                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 pr-2">
                        <Text className="text-xl font-bold">{item.title}</Text>
                        <Text className="text-sm text-blue-600 mt-1">
                            Instructor: {item.instructor}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => toggleBookmark(item.id)}
                    >
                        <Ionicons
                            name={
                                item.bookmarked
                                    ? 'bookmark'
                                    : 'bookmark-outline'
                            }
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-600 mb-4">
                    {item.description}
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: '/webview/[id]',
                            params: { id: item.id.toString() },
                        })
                    }
                    className="bg-blue-600 rounded-xl p-3"
                >
                    <Text className="text-white text-center font-semibold">
                        View Course Content
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
        ),
        [toggleBookmark]
    );

    return (
        <View className="flex-1 bg-white px-4 pt-12">
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="mb-4 flex-row items-center"
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="black"
                />
                <Text className="ml-2 text-lg font-semibold">
                    Back
                </Text>
            </TouchableOpacity>

            <Text className="text-3xl font-bold mb-4">
                Course Catalog
            </Text>

            <TextInput
                placeholder="Search courses..."
                value={search}
                onChangeText={handleSearch}
                className="border border-gray-300 rounded-xl p-4 mb-4"
            />

            <LegendList
                data={filteredCourses}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={320}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadCourses}
                    />
                }
                renderItem={renderCourseItem}
            />
        </View>
    );
}