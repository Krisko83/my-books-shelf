import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './contexts/auth/AuthContext.js';
import RootNavigator from './navigation/RootNavigator.jsx';
import AuthContextProvider from './contexts/auth/AuthContext.jsx';
import AuthNavigator from './navigation/AuthNavigator.jsx';



export default function App() {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AuthContextProvider>

          <AuthContext.Consumer>
            {({ isAuthenticated }) =>
              isAuthenticated
                ?
                <RootNavigator />
                :
                <AuthNavigator />
            }
          </AuthContext.Consumer>

        </AuthContextProvider>
      </NavigationContainer>
    </>
  );
}

