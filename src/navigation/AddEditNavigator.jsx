import { createStackNavigator } from "@react-navigation/stack";
import AddBookScreen from "../screens/AddBookScreen.jsx";

export default function AddEditNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Add' component={AddBookScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}