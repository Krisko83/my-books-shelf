import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen.jsx";

export default function ProfileNavigator() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerLeft: () => null }}/>
        </Stack.Navigator>
    );
}