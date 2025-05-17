// app/index.js (Landing Page)
import { View, Image, Text, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import { useAuth } from '@/components/auth/authContext';
export default function LandingPage() {
  const { user } = useAuth();
  console.log(user);
  return (
    <View className="flex-1 relative">
      <Image
        source={require("../assets/images/testing.png")}
        className="w-full h-full absolute"
        resizeMode="cover"
      />
      
      <View className="flex-1 justify-end items-center pb-16 px-12">
        <TouchableOpacity 
            className="w-full bg-[#CBE4F9] rounded-2xl py-4 items-center"
            onPress={() => router.push('/auth/signup')}
        >
          <Text className="text-[#2B7A78] font-semibold text-lg">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}