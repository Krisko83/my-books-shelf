import { View, Text, StatusBar, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { colors } from '../../../theme'; 

export default function WelcomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>

        <Image source={require('../../assets/books.jpg')} style={styles.image} />

        <View style={styles.overlay}>

          <View style={styles.logo}>
            <Text style={styles.logo}>&#128214;</Text>
          </View>

          <View style={styles.brand}>
            <Text style={styles.title}>My BookShelf</Text>
            <Text style={styles.subtitle}>Your personal library,{"\n"}always with you.</Text>
          </View>

          <View style={{ width: '100%', gap: 14, paddingBottom: 30, justifyContent: 'center' }}>
           
              <Pressable style={styles.button} onPress={() => console.log('Get Started')}>
                <Text style={styles.buttonText}>Get Started</Text>
              </Pressable>
          
            <Pressable onPress={() => console.log('Sign in')}>
              <Text style={styles.signIn}>Already have an account? <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign In</Text></Text>
            </Pressable>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%'
  },
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
    height: '100%'
  },
  overlay: {
    height: '90%',
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
    marginTop: 5
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 28,
//     paddingTop: 20,
//     paddingBottom: 36
//   },
//   logoCircle: {
//     width: 300,
//     height: 200,
//     borderRadius: 24,
//     backgroundColor: colors.softPurple,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   logo: {
//     fontSize: 100,
//     color: colors.primary,
//     fontWeight: '900',

//   },
//   brand: {
//     fontSize: 34,
//     fontWeight: '900',
//     color: colors.text,
//     marginTop: -24
//   },
//   tagline: {
//     fontSize: 18,
//     color: colors.text,
//     textAlign: 'center',
//     lineHeight: 27,
//     marginTop: -28
//   },
//   illustration: {
//     height: 235,
//     width: '100%',
//     backgroundColor: '#F0EDFF',
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     overflow: 'hidden',
//     paddingBottom: 36
//   },
//   booksRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     gap: 7,
//     zIndex: 1
//   },
//   book: {
//     width: 38,
//     borderRadius: 5,
//     borderWidth: 2,
//     borderColor: '#FFFFFF55'
//   },
//   shelf: {
//     height: 15,
//     width: '85%',
//     backgroundColor: '#C9BDFB',
//     borderRadius: 8,
//     marginTop: -2
//   },
//   plant: {
//     position: 'absolute',
//     top: 25,
//     left: 32,
//     fontSize: 70,
//     color: '#C5B9F5'

//   },
//   cup: {
//     position: 'absolute',
//     bottom: 48,
//     right: 25,
//     fontSize: 39
//   },
//   signIn: {
//     color: colors.muted,
//     textAlign: 'center',
//     fontSize: 13,
//     marginTop: 5
//   },
// });

