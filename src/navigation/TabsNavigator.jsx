import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator.jsx";
import ProfileNavigator from "./ProfileNavigator.jsx";
import AddEditNavigator from "./AddEditNavigator.jsx";
import LibraryNavigator from "./LibraryNavigator.jsx";

export default function TabsNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{ headerBackVisible: false, title: 'Home', headerShown: false, tabBarIcon: () => <Ionicons name="home" size={24} /> }}
            />
            <Tab.Screen
                name="LibraryTab"
                component={LibraryNavigator}
                options={{ title: 'Library', headerShown: false, tabBarIcon: () => <Ionicons name="book-sharp" size={24} /> }}
            />
            <Tab.Screen
                name="AddTab"
                component={AddEditNavigator}
                options={{ title: 'Add book', tabBarIcon: () => <Ionicons name="add" size={24} /> }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileNavigator}
                options={{ title: 'Profile', headerShown: false, tabBarIcon: () => <Ionicons name="person-sharp" size={24} /> }}
            />
        </Tab.Navigator>
    );
}
