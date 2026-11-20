import { createStackNavigator } from "@react-navigation/stack";
import MyBookScreen from "../screens/MyBookScreen.jsx";

const Stack = createStackNavigator();

export default function LibraryNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name='Library' component={MyBookScreen} options={{ title: 'My Library',  headerShown: false }} />
        </Stack.Navigator>
    );
}