import { createStackNavigator } from "@react-navigation/stack";
import MyBookScreen from "../screens/MyBookScreen.jsx";

export default function LibraryNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Library' component={MyBookScreen} options={{ title: 'My Library' }} />
        </Stack.Navigator>
    );
}