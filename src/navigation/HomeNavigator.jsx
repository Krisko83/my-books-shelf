import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen.jsx";
import { colors } from "../../theme.js";
import OtherUserBookScreen from "../screens/OtherUserBookScreen.jsx";

const Stack = createStackNavigator();

export default function HomeNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Book Shelf', headerShown: false }} />
             
        </Stack.Navigator>
    );
}
