import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import MainTabs from './MainTabs';
import { AuthStackParamList } from './types';

// Replaces the app-entry switch in BhratrumandalPuneApp.swift: show the main
// tabbed app when logged in, otherwise the auth flow (Splash → Login → OTP/Signup).
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <MainTabs />;
  }

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="OTP" component={OTPScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}
