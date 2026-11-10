import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen.jsx";
import LoginScreen from "../screens/LoginScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";
import ProfileScreen from "../screens/ProfileScreen.jsx";

export default function HomeNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Book Shelf' }} />

        </Stack.Navigator>
    );
}
