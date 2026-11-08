import { createStackNavigator } from "@react-navigation/stack";
import BookDetailsScreen from "../screens/BookDetailsScreen.jsx";
import TabsNavigator from "./TabsNavigator.jsx";
import WelcomeScreen from "../screens/WelcomeScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";
import LoginScreen from "../screens/LoginScreen.jsx";
import SettingsScreen from "../screens/SettingsScreen.jsx";
import MyBookScreen from "../screens/MyBookScreen.jsx";
import AddBookScreen from "../screens/AddBookScreen.jsx";

export default function RootNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
            <Stack.Screen name="MainHome" component={TabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Details" component={BookDetailsScreen} />
            <Stack.Screen name="MainMyBooks" component={MyBookScreen} options={{ title: 'My Library' }} />
            <Stack.Screen name='MainAdd' component={AddBookScreen} options={{ title: 'Add Book'}} />
        </Stack.Navigator>
    );
}