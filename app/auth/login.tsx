import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/components/auth/authContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const handleLogin = async () => {
        const response = await login(email, password);
        console.log(response);
        if (response.success) {
            router.push('/main/home'); 
        } else {
            console.error(response.error);
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                
                {/* Dark Overlay with gradient effect */}
                <View className="absolute w-full h-full bg-gradient-to-b from-black/40 to-black/70" />
                
                <SafeAreaView className="flex-1">
                    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
                        {/* Top Section - Logo or Back Button could go here */}
                        <View className="h-20 px-6 flex-row items-center">
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text className="text-white text-lg">← Back</Text>
                            </TouchableOpacity>
                        </View>
                        
                        {/* Main Content */}
                        <View className="flex-1 justify-end items-center px-8 pb-12">
                            
                            {/* Form Fields */}
                            <View className="w-full space-y-4">
                                <View>
                                    <Text className="text-white/90 text-sm mb-1 ml-1">Email</Text>
                                    <TextInput
                                        placeholder="your@email.com"
                                        placeholderTextColor="#aaa"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                        className="bg-white/10 text-black px-4 py-4 rounded-xl border border-white/20"
                                    />
                                </View>
                                
                                <View>
                                    <Text className="text-white/90 text-sm mb-1 ml-1">Password</Text>
                                    <TextInput
                                        placeholder="Your password"
                                        placeholderTextColor="#aaa"
                                        secureTextEntry
                                        className="bg-white/10 text-black px-4 py-4 rounded-xl border border-white/20"
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>
                                
                                {/* Forgot Password */}
                                <TouchableOpacity className="self-end">
                                    <Text className="text-white/80 text-sm">Forgot Password?</Text>
                                </TouchableOpacity>
                                
                                {/* Login Button */}
                                <TouchableOpacity
                                    className="bg-white py-4 rounded-xl items-center mt-6"
                                    onPress={handleLogin} // Use the new handleLogin function
                                >
                                    <Text className="text-black font-semibold text-lg">Log In</Text>
                                </TouchableOpacity>
                                
                                {/* Sign Up Link */}
                                <TouchableOpacity
                                    className="mt-8 py-2"
                                    onPress={() => router.push('/auth/signup')}
                                >
                                    <Text className="text-white text-center opacity-80">
                                        Don't have an account? <Text className="font-semibold">Sign Up</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    );
}