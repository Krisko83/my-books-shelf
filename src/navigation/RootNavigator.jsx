import { createStackNavigator } from "@react-navigation/stack";
import BookDetailsScreen from "../screens/BookDetailsScreen.jsx";
import TabsNavigator from "./TabsNavigator.jsx";
import SettingsScreen from "../screens/SettingsScreen.jsx";
import MyBookScreen from "../screens/MyBookScreen.jsx";
import AddBookScreen from "../screens/AddBookScreen.jsx";
import EditProfileScreen from "../screens/EditProfileScreen.jsx";
import { colors } from "../../theme.js";
import AboutAppScreen from "../screens/AboutAppScreen.jsx";
import OtherUserBookScreen from "../screens/OtherUserBookScreen.jsx";



const Stack = createStackNavigator()

export default function RootNavigator() {


    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="MainHome" component={TabsNavigator} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Details" component={BookDetailsScreen} />
            <Stack.Screen name="MainMyBooks" component={MyBookScreen} options={{ title: 'My Library' }} />
            <Stack.Screen name='AddEdit' component={AddBookScreen} options={{ title: 'Edit Book' }} />
            <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
            <Stack.Screen name='AboutApp' component={AboutAppScreen} />
            <Stack.Screen name="UsersBooks" component={OtherUserBookScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}