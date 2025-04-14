// app/index.js (Landing Page)
import { View, Image, Text, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import { useAuth } from '@/components/auth/authContext';
export default function LandingPage() {
  const { user } = useAuth();
  console.log(user);
  if (user) {
    router.push('/main/home');
  }
  return (
    <View className="flex-1 relative">
      <Image
        source={require("../assets/images/test.jpg")}
        className="w-full h-full absolute"
        resizeMode="cover"
      />
      
      <View className="flex-1 justify-end items-center pb-20 px-6">
        <TouchableOpacity 
          className="w-full bg-white/20 border border-white/30 rounded-2xl py-4 mb-4 items-center backdrop-blur-md"
          onPress={() => router.push('/auth/login')}
        >
          <Text className="text-white font-semibold text-lg">Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 items-center backdrop-blur-md"
          onPress={() => router.push('/auth/signup')}
        >
          <Text className="text-white font-semibold text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}