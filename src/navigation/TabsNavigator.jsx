import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator.jsx";
import ProfileNavigator from "./ProfileNavigator.jsx";
import AddEditNavigator from "./AddEditNavigator.jsx";
import LibraryNavigator from "./LibraryNavigator.jsx";
import * as Haptics from 'expo-haptics';
import OtherUserBookScreen from "../screens/OtherUserBookScreen.jsx";
import UsersBooksNavigator from "./UsersBooksNavigator.jsx";


const Tab = createBottomTabNavigator();

export default function TabsNavigator() {

    return (
        <Tab.Navigator screenListeners={{
            tabPress: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }
        }}>
            <Tab.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    headerBackVisible: false, title: 'Home', headerShown: false, tabBarIcon: () => <Ionicons name="home" size={24}
                    />
                }}
            />
            <Tab.Screen
                name="LibraryTab"
                component={LibraryNavigator}
                options={{
                    title: 'Library', headerShown: false, tabBarIcon: () => <Ionicons name="book-sharp" size={24} />
                }}
            />
            <Tab.Screen
                name="AddTab"
                component={AddEditNavigator}
                options={{
                    title: 'Add book', headerShown: false, tabBarIcon: () => <Ionicons name="add" size={24} />
                }}
            />
            <Tab.Screen
                name="FindBooks"
                component={UsersBooksNavigator}
                options={{
                    title: 'Find Book', headerShown: false, tabBarIcon: () => <Ionicons name="book-outline" size={24} />
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileNavigator}
                options={{
                    title: 'Profile', headerShown: false, tabBarIcon: () => <Ionicons name="person-sharp" size={24} />
                }}
            />
        </Tab.Navigator>
    );
}
