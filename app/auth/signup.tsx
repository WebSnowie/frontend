import { router } from "expo-router";
import { TouchableOpacity, View, Image, Text, TextInput, Animated, Dimensions } from "react-native";
import { useState, useRef, useEffect } from "react";

export default function SignUpScreen() {
  const [showForm, setShowForm] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;

  const handleEmailPress = () => {
    setShowForm(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = {
    transform: [{
      translateY: slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [screenHeight, 0]
      })
    }]
  };

  return (
    <View className="flex-1 relative">
      <Image
        source={require("../../assets/images/signup.png")}
        className="w-full h-full absolute"
        resizeMode="cover"
      />
      
      <View className="flex-1 justify-end items-center pb-16 px-12">
        <TouchableOpacity 
            className="w-3/4 bg-[#FFFFFF] rounded-xl py-3 items-center"
            onPress={handleEmailPress}
        >
          <Text className="text-black/70 font-semibold text-lg">Continue with Email</Text>
        </TouchableOpacity>
        <Text className="text-black/70 text-md font-bold m-4">or</Text>
        <View className="flex-row items-center justify-center gap-4">
          <TouchableOpacity 
              className="w-12 h-12 bg-[#FFFFFF] rounded-full items-center justify-center"
              onPress={() => router.push('/auth/signup')}
          >
            <Image source={require("../../assets/images/google.png")} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity 
              className="w-12 h-12 bg-[#FFFFFF] rounded-full items-center justify-center"
              onPress={() => router.push('/auth/signup')}
          >
            <Image source={require("../../assets/images/apple.png")} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity 
              className="w-12 h-12 bg-[#FFFFFF] rounded-full items-center justify-center"
              onPress={() => router.push('/auth/signup')}
          >
            <Image source={require("../../assets/images/facebook.png")} className="w-6 h-6" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View 
        style={[slideUp]} 
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 h-1/2 z-50"
      >

        <Text className="text-2xl font-bold text-center mb-6">Ready for takeoff!</Text>
        <Text className="text-black/70 text-md font-bold my-1.5 ">Your Name</Text>
        <TextInput
          className="w-full bg-white/80 rounded-xl px-4 py-3.5 mb-2 border-[#D8D8D8] border-2"
          placeholder="Captain sully"
          placeholderTextColor="#666"
        />
        <Text className="text-black/70 text-md font-bold my-1.5 ">Your Email</Text>
        <TextInput
          className="w-full bg-white/80 rounded-xl px-4 py-3.5 mb-2 border-[#D8D8D8] border-2"
          placeholder="sully@gmail.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />
        <Text className="text-black/70 text-md font-bold my-1.5 ">Password</Text>
        <TextInput
          className="w-full bg-white/80 rounded-xl px-4 py-3.5 mb-8 border-[#D8D8D8] border-2"
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
        />
        <TouchableOpacity 
          className="w-2/3 bg-[#2516FA] rounded-xl py-3 items-center mx-auto"
          onPress={() => router.push('/main/home')}
        >
          <Text className="text-white font-semibold text-lg">Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}