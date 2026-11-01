import { StyleSheet, View, StatusBar } from 'react-native';
// import HomeScreen from './screens/home/HomeScreen.jsx';
import LoginScreen from './screens/login/LoginScreen.jsx';
import RegisterScreen from './screens/register/RegisterScreen.jsx';
// import SettingsScreen from './screens/settings-screen/SettingsScreen.jsx';
import WelcomeScreen from './screens/welcome/WelcomeScreen.jsx';
// import ProfileScreen from './screens/profile/ProfileScreen.jsx';
// import AddBookScreen from './screens/add-book/AddBookScreen.jsx';
// import BookDetailsScreen from './screens/book-details/BookDetailsScreen.jsx';
 
 
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