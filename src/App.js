import { StyleSheet, View, StatusBar } from 'react-native';
import AddBookScreen from './screens/AddBookScreen.jsx';
import BookDetailsScreen from './screens/BookDetailsScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import WelcomeScreen from './screens/WelcomeScreen.jsx';
 
export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      <LoginScreen />
      {/* <RegisterScreen /> */}
      {/* <SettingsScreen /> */}
      {/* <WelcomeScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <AddBookScreen /> */}
      {/* <BookDetailsScreen /> */}
      <StatusBar barStyle='dark-content' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
