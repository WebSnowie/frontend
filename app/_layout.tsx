import { Stack } from "expo-router";
import "./global.css"
import { AuthProvider } from "../components/auth/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header for all screens
        animation: 'slide_from_right',
      }}
    />
    </AuthProvider>
  );
}
