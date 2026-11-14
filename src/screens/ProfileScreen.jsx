import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { colors } from '../../theme.js';
import ProfileButton from '../components/ProfileButton.jsx';
import { useAuthContext } from '../contexts/auth/AuthContext.js';
import { useEffect, useState } from 'react';
import { authApi, userApi } from '../api/index.js';

export default function ProfileScreen({ navigation }) {
  const { logout, user } = useAuthContext();

  const [userInfo, setUserInfo] = useState([]);
  const userId = user.id;

  useEffect(() => {
    userApi.getUserInfo(userId)
      .then(data => setUserInfo(data[0]))
      .catch(err => Alert.alert(err.message))
  }, [])

  const logoutHandler = async () => {

    try {
      await authApi.logout();
      // logout();

    } catch (err) {

      Alert.alert(err.message)
    } finally {
      logout();
    }
  }



  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.imageContainer}>

          <View style={styles.image}>
            <Text style={{ fontSize: 39 }}>👤</Text>
          </View>

          <Text style={styles.name}>Name: {userInfo?.fullName || 'Anonymous'}</Text>
          <Text style={styles.username}>Username:{userInfo?.username || 'Anonymous'}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          {/* <Text style={styles.email}>{user.country.name} {country.cca2}</Text> */}

        </View>

        <View style={[styles.card, { paddingVertical: 4 }]}>
          <ProfileButton icon='▤' name='My Library' onPress={() => navigation.navigate('MainMyBooks')} />

          <ProfileButton icon='▥' name='Edit Profile' onPress={() => navigation.navigate('EditProfile', userInfo )} />

          <ProfileButton icon='⚙' name='Settings' onPress={() => navigation.navigate('Settings')} />

          <ProfileButton icon='?' name='Help & Support' onPress={() => navigation.navigate('MainMyBooks')} />

          <ProfileButton icon='ⓘ' name='About My BookShelf' onPress={() => navigation.navigate('MainMyBooks')} />
        </View>

        <Pressable style={styles.outlineButton} onPress={logoutHandler}>
          <Text style={styles.outlineButtonText}>⇥  Log Out</Text>
        </Pressable>

      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%'
  },
  content: {
    padding: 22,
    paddingBottom: 36
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },
  outlineButton: {
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 24
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700'
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEEF6',
  },
  image: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: colors.softPurple,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 13
  },
  username: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    // marginTop: 13
  },
  email: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 28
  }
});

