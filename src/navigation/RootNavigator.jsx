import { createStackNavigator } from "@react-navigation/stack";
import BookDetailsScreen from "../screens/BookDetailsScreen.jsx";
import TabsNavigator from "./TabsNavigator.jsx";
import SettingsScreen from "../screens/SettingsScreen.jsx";
import MyBookScreen from "../screens/MyBookScreen.jsx";
import AddBookScreen from "../screens/AddBookScreen.jsx";
import EditProfileScreen from "../screens/EditProfileScreen.jsx";
import { colors } from "../../theme.js";

const Stack = createStackNavigator()

export default function RootNavigator() {

    return (
        <Stack.Navigator>
            
            <Stack.Screen name="MainHome" component={TabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Details" component={BookDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MainMyBooks" component={MyBookScreen} options={{ title: 'My Library' ,headerShown: false }} />
            <Stack.Screen name='AddEdit' component={AddBookScreen} options={{ title: 'Edit Book' , headerShown: false}} />
            <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ title: 'Edit Profile' }} />

        </Stack.Navigator>
    );
}