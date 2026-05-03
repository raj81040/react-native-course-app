import { Text, View } from 'react-native';

interface Props {
  message: string;
}

export default function ErrorBanner({ message }: Props) {
  return (
    <View className="bg-red-100 p-3 rounded-xl mb-4">
      <Text className="text-red-600 text-center font-medium">
        {message}
      </Text>
    </View>
  );
}