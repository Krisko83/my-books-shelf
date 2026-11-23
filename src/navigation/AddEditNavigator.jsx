import { createStackNavigator } from "@react-navigation/stack";
import AddBookScreen from "../screens/AddBookScreen.jsx";

const Stack = createStackNavigator();

export default function AddEditNavigator() {
 

    return (
        <Stack.Navigator>
            <Stack.Screen name='Add' component={AddBookScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}