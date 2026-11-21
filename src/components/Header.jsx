import { Image, Platform, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';

export default function Header({
    username,
    onLogout,
    imageUrl,
    screenName,
}) {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const goBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        navigation.goBack()
    }

    const goToProfile = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        navigation.navigate('ProfileTab')
    }

    return (
        <View style={styles.header}>
            {screenName === 'Home'
                ?
                <View style={styles.userRow}>
                    <Pressable onPress={() => goToProfile()}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imageUrl || null }} style={styles.image} />

                        </View>
                    </Pressable>

                    <View style={styles.userInfo}>
                        <Text style={styles.greeting}>{t('welcomeBack')},</Text>
                        <Text style={styles.username} numberOfLines={1}>{username || 'User'}</Text>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={onLogout}>
                        <Text style={styles.logoutIcon}>⎋</Text>
                        <Text style={styles.logoutText}>{t('logout')}</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    {screenName !== 'Welcome' &&
                        <Pressable onPress={() => goBack()}>
                            <Text style={{ color: 'white', fontSize: 50 }}>↩</Text>
                        </Pressable>
                    }

                    <Text style={{ color: 'white', fontSize: 23, paddingLeft: 15 }}>{screenName}</Text>

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
        height: 140
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
    username: {
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
        width: 60,
        height: 60,
        marginRight: 14,
        borderWidth: 1,
          borderRadius: 100,
          borderColor: colors.primaryDark
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    }
});
