import { Text, View } from 'react-native';

export default function OfflineBanner() {
  return (
    <View className="bg-yellow-100 p-3 rounded-xl mb-4">
      <Text className="text-yellow-700 text-center font-medium">
        You are offline
      </Text>
    </View>
  );
}