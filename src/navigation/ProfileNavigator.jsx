import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen.jsx";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}  />
        </Stack.Navigator>
    );
}