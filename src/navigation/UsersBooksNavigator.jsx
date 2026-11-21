import { createStackNavigator } from "@react-navigation/stack";
import OtherUserBookScreen from "../screens/OtherUserBookScreen.jsx";

const Stack = createStackNavigator();

export default function UsersBooksNavigator() {
    
    return (
        <Stack.Navigator>
            <Stack.Screen name='UsersAllBooks' component={OtherUserBookScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}