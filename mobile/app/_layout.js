import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { InventoryProvider } from '../app/Context/InventoryContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
      return;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <InventoryProvider> {/* Wrap your Stack with InventoryProvider */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="main" 
          options={{ 
            title: 'Botibot Dashboard',
            headerStyle: {
              backgroundColor: '#4a6fa5', // denim
            },
            headerTintColor: '#f5f1e8', // bamboo
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
            },
          }} 
        />
        <Stack.Screen 
          name="register" 
          options={{ 
            title: 'Create Account',
            headerStyle: {
              backgroundColor: '#4a6fa5', // denim
            },
            headerTintColor: '#f5f1e8', // bamboo
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
            },
          }} 
        />
      </Stack>
    </InventoryProvider>
  );
};

export default RootLayout;