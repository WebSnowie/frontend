// app/signup.js
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import { useAuth } from '@/components/auth/authContext';
import { useState } from 'react';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useAuth();

  const handleSignUp = async () => {
    const response = await signup(email, password, name);
    if (response.success) {
      router.push('/'); // Redirect to home or another screen on success
    } else {
      console.error(response.error); // Handle error appropriately
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Sign Up Screen</Text>
      <Text className="text-gray-600 mb-8">Create a new account</Text>
      
      <View className="w-full px-6">
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className="bg-white py-3 px-4 rounded-lg mb-4"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="bg-white py-3 px-4 rounded-lg mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="bg-white py-3 px-4 rounded-lg mb-4"
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        className="mt-6 bg-blue-500 py-3 px-6 rounded-lg"
        onPress={handleSignUp}
      >
        <Text className="text-white font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="mt-6"
        onPress={() => router.back()}
      >
        <Text className="text-blue-500">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}