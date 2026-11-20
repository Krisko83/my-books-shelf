import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen.jsx";
import LoginScreen from "../screens/LoginScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";

const Stack = createStackNavigator();

export default function AuthNavigator() {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}  />
            <Stack.Screen name="Login" component={LoginScreen}   />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}