import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "@/components/auth/authContext";
export default function MainScreen() {
  const { logout } = useAuth();

  // Mock data for flights
  const nearbyFlights = [
    { flightNumber: "LH456", altitude: "34,000 ft", airline: "Lufthansa" },
    { flightNumber: "AA11", altitude: "30,000 ft", airline: "American" },
    { flightNumber: "BA22", altitude: "28,000 ft", airline: "British Airways" },
    { flightNumber: "AF33", altitude: "25,000 ft", airline: "Air France" },
    
  ];

  // Mock data for spotter's feed
  const spottersFeed = [
    { username: "john_doe", handle: "aviationgeek", aircraft: "Emirates 777", comments: 83 },
    { username: null, handle: null, aircraft: "United Boeing 757", comments: 16 },
  ];

  return (
    <View className="flex-1 bg-black p-4 pt-12">
      <Text className="text-white text-2xl font-bold mb-4">Live Nearby Flights</Text>

      <ScrollView className="flex-1">
        {nearbyFlights.map((flight, index) => (
          <View key={index} className="bg-zinc-900 p-4 rounded-xl mb-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-white text-lg font-semibold">{flight.flightNumber}</Text>
              <Text className="text-zinc-400">{flight.altitude}</Text>
            </View>
            <Text className="text-zinc-400 mb-2">{flight.airline}</Text>
          </View>
        ))}

        <Text className="text-white text-2xl font-bold mt-8 mb-4">Spotter's Feed</Text>

        {spottersFeed.map((spotter, index) => (
          <View key={`spotter-${index}`} className="bg-zinc-900 p-4 rounded-xl mb-3">
            {spotter.username && (
              <View className="flex-row mb-1">
                <Text className="text-white font-medium mr-2">{spotter.username}</Text>
                <Text className="text-zinc-400">{spotter.handle}</Text>
              </View>
            )}
            <Text className="text-zinc-400 mb-2">{spotter.aircraft}</Text>
            <View className="bg-blue-500 rounded-full w-6 h-6 items-center justify-center absolute right-4 top-4">
              <Text className="text-white text-xs">{spotter.comments}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-600 px-5 py-3 rounded-full shadow-lg">
        <Text className="text-white font-semibold">Open Map</Text>
      </TouchableOpacity>
    </View>
  );
}