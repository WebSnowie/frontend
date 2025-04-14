import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

export const signup = async (email: string, password: string, name: string) => {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5001';
    
    const response = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.error || 'Signup failed',
        statusCode: response.status 
      };
    }

    return {
      success: true,
      id: data.id,
      email: data.email,
      name: data.name,
      statusCode: response.status 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Network error or server unavailable',
      statusCode: 500 
    };
  }
};

