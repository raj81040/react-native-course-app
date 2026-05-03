import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useCourseStore } from '../../src/store/courseStore';

export default function CourseWebViewScreen() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const course = useCourseStore((state) =>
    state.courses.find((c) => c.id === Number(id))
  );

  if (!course) return null;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body {
            font-family: -apple-system, sans-serif;
            padding: 24px;
            background-color: #ffffff;
            color: #1e293b;
            line-height: 1.6;
          }
          h1 {
            color: #0f172a;
            font-size: 28px;
            margin-bottom: 8px;
          }
          img {
            width: 100%;
            aspect-ratio: 16/9;
            object-fit: cover;
            border-radius: 16px;
            margin: 20px 0;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          .instructor-chip {
            display: inline-block;
            background: #dcfce7;
            color: #166534;
            padding: 4px 12px;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 600;
          }
          p {
            font-size: 16px;
            color: #475569;
          }
        </style>
      </head>
      <body>
        <div class="instructor-chip">Course Content</div>
        <h1>${course.title}</h1>
        <img src="${course.thumbnail}" />
        <p><strong>Lead Instructor:</strong> ${course.instructor}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p>${course.description}</p>
      </body>
    </html>
  `;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* --- MINI HEADER --- */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 -ml-2"
        >
          <Ionicons name="close" size={28} color="#1e293b" />
        </TouchableOpacity>
        <Text className="ml-2 font-bold text-lg text-slate-800 flex-1" numberOfLines={1}>
          {course.title}
        </Text>
      </View>

      <View className="flex-1">
        <WebView
          originWhitelist={['*']}
          source={{
            html: htmlContent,
            baseUrl: '',
            headers: {
              Authorization: 'Bearer dummy-course-token',
              CourseId: String(course.id),
            },
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          className="flex-1"
        />

        {/* --- LOADING OVERLAY --- */}
        {isLoading && (
          <View className="absolute inset-0 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="mt-4 text-slate-400 font-medium">Preparing Lesson...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}