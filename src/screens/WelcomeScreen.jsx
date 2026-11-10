import { View, Text, StatusBar, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { colors } from '../../theme.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>

      <Image source={require('../assets/books.jpg')} style={styles.image} />

      <View style={styles.overlay}>

        <View style={styles.logo}>
          <Text style={styles.logo}>&#128214;</Text>
        </View>

        <View style={styles.brand}>
          <Text style={styles.title}>My BookShelf</Text>
          <Text style={styles.subtitle}>Your personal library,{"\n"}always with you.</Text>
        </View>

        <View style={{ width: '100%', paddingBottom: 60, justifyContent: 'center' }}>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }} >
            <Text style={styles.signIn}>Already have an account?
              <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign In</Text>
            </Text>
          </Pressable>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 25,
    color: colors.surface,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  brand: {
    marginBottom: 60
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    width: '80%',
    margin: 'auto'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 200,
  },
  signIn: {
    color: colors.surface,
    textAlign: 'center',
    fontSize: 13,
    // marginTop: 5,
  },
});



