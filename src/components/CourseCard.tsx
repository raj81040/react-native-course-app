import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  bookmarked: boolean;
}

interface Props {
  item: Course;
  onPress: () => void;
  onBookmark: () => void;
  onViewContent: () => void;
}

function CourseCard({
  item,
  onPress,
  onBookmark,
  onViewContent,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
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

        <TouchableOpacity onPress={onBookmark}>
          <Ionicons
            name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-600 mb-4">
        {item.description}
      </Text>

      <TouchableOpacity
        onPress={onViewContent}
        className="bg-blue-600 rounded-xl p-3"
      >
        <Text className="text-white text-center font-semibold">
          View Course Content
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default memo(CourseCard);