import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator.jsx";
import ProfileScreen from "../screens/ProfileScreen.jsx";
import AddBookScreen from "../screens/AddBookScreen.jsx";
import { Ionicons } from "@expo/vector-icons";
import ProfileNavigator from "./ProfileNavigator.jsx";
import MyBookScreen from "../screens/MyBookScreen.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";

export default function TabsNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: 'Home', headerShown: false, tabBarIcon: () => <Ionicons name="home" size={24} /> }} />
            <Tab.Screen name="Library" component={MyBookScreen} options={{title: 'Library', headerShown: false, tabBarIcon: () => <Ionicons name="book-sharp" size={24} /> }} />
            <Tab.Screen name="Add" component={AddBookScreen} options={{ title: 'Add book',tabBarIcon: () => <Ionicons name="add" size={24} /> }} />
            <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{title: 'Profile', headerShown: false, tabBarIcon: () => <Ionicons name="person-sharp" size={24} /> }} />
        </Tab.Navigator>
    );
}
