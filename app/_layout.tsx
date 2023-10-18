import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AuthStack } from '../stacks/AuthStack';
import { ProtectedStack } from '../stacks/ProtectedStack';
import { NavigationContainer } from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Text,
} from 'react-native-paper';
import CenterLoader from '../components/CenterLoader';
import { UserContext, UserProvider } from '../context/UserContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { user, initialized } = useContext(UserContext);

  useEffect(() => {
    if (!initialized) return;
  }, [user, initialized]);

  return (
    <>
      {initialized ? (user ? (<ProtectedStack />) : (<AuthStack />)) : <CenterLoader />}
    </>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme }
      : { ...MD3LightTheme };
  
  return (
    <NavigationContainer independent={true}>
      <UserProvider>
        <PaperProvider theme={paperTheme}>
            <InitialLayout />
        </PaperProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
