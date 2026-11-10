import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen.jsx";
import LoginScreen from "../screens/LoginScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";

export default function AuthNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}