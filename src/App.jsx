import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './contexts/auth/AuthContext.js';
import RootNavigator from './navigation/RootNavigator.jsx'; 
import AuthNavigator from './navigation/AuthNavigator.jsx';
import AuthProvider from './contexts/auth/AuthContext.jsx';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

export default function App() {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AuthProvider>

          <AuthContext.Consumer>
            {({ isAuthenticated }) =>
              isAuthenticated
                ?
                <RootNavigator />
                :
                <AuthNavigator />
            }
          </AuthContext.Consumer>

        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

