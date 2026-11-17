import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen.jsx"; 

const Stack = createStackNavigator();

export default function HomeNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Book Shelf' }} />

        </Stack.Navigator>
    );
}
