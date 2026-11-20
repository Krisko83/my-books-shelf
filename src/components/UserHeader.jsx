import { Image, Platform, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme.js';
import { useNavigation } from '@react-navigation/native';

export default function UserHeader({

    username,
    onLogout,
    imageUrl,
    screenName
}) {

    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            {username
                ?
                <View style={styles.userRow}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.name} numberOfLines={1}>{username}</Text>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={onLogout}>
                        <Text style={styles.logoutIcon}>⎋</Text>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ flexDirection: 'row' }}>

                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'white', fontSize: 50 }}>↩</Text>
                    </Pressable>
                    <Text style={{ color: 'white', fontSize: 25, paddingLeft: 30 }}>{screenName}</Text>

                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        height: 150
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 26,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',

    },
    avatarText: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.primary,
    },
    userInfo: {
        flex: 1,
        gap: 15
    },
    greeting: {
        fontSize: 13,
        color: 'white',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        // color: 'rgba(255, 255, 255, 0.75)',
        color: 'white'
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginLeft: 8,
    },
    logoutIcon: {
        fontSize: 11,
        color: colors.white,
        marginRight: 4,
    },
    logoutText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.white,
    },
    imageContainer: {
        width: 50,
        height: 50,
        marginRight: 14
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    }
});
