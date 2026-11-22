import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './contexts/auth/AuthContext.js';
import RootNavigator from './navigation/RootNavigator.jsx';
import AuthNavigator from './navigation/AuthNavigator.jsx';
import AuthProvider from './contexts/auth/AuthContext.jsx';
import * as SplashScreen from 'expo-splash-screen';
import { Entypo } from '@expo/vector-icons';
import './localization/i18n.js';
import UserSettingsProvider from './contexts/auth/UserSettingsContext.jsx';
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });


export default function App() {

  return (
    <>
      <StatusBar barStyle="auto" />
      <UserSettingsProvider>
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
            {/* <Entypo name="rocket" size={30} /> */}

          </AuthProvider>
        </NavigationContainer>
      </UserSettingsProvider>
    </>
  );
}

