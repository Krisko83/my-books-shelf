import { createStackNavigator } from "@react-navigation/stack";
import BookDetailsScreen from "../screens/BookDetailsScreen.jsx";
import TabsNavigator from "./TabsNavigator.jsx";
import SettingsScreen from "../screens/SettingsScreen.jsx";
import MyBookScreen from "../screens/MyBookScreen.jsx";
import AddBookScreen from "../screens/AddBookScreen.jsx";
import EditProfileScreen from "../screens/EditProfileScreen.jsx";

export default function RootNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="MainHome" component={TabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Details" component={BookDetailsScreen} />
            <Stack.Screen name="MainMyBooks" component={MyBookScreen} options={{ title: 'My Library' }} />
            <Stack.Screen name='Edit' component={AddBookScreen} options={{ title: 'Edit Book' }} />
            <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ title: 'Edit Profile' }} />

        </Stack.Navigator>
    );
}