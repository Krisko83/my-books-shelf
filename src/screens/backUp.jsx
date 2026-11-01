import { View, Text, StatusBar, StyleSheet, Image, ScrollView } from 'react-native';
import { colors, common } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        {/* <StatusBar barStyle="dark-content" /> */}
   
          <Image source={require('../assets/books.jpg')} style={styles.image} />
     

        <View style={styles.overlay}>
          {/* <View style={styles.logoCircle}> */}
          {/* <Text style={styles.logo}>▤</Text> */}
          <View  >
            <Text style={styles.logo}>&#128214;</Text>
          </View>

          {/* </View> */}
          <View style={styles.brand}>
            <Text style={styles.title}>My BookShelf</Text>
            <Text style={styles.subtitle}>Your personal library,{"\n"}always with you.</Text>
          </View>

          <View style={{ width: '100%', gap: 14, paddingBottom: 30 }}>
            <View style={common.button}><Text style={common.buttonText}>Get Started</Text></View>
            <Text style={styles.signIn}>Already have an account? <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign In</Text></Text>
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
    width: '100%'
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 120
  },
  title: {
    fontSize: 55,
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
    backgroundColor: '#5944D6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 28,
    paddingTop: 20,
    paddingBottom: 36
  },
  logoCircle: {
    width: 300,
    height: 200,
    borderRadius: 24,
    backgroundColor: colors.softPurple,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 180,
    color: colors.primary,
    fontWeight: '900',

  },

  tagline: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 27,
    // marginTop: -28
  },
  illustration: {
    height: 235,
    width: '100%',
    backgroundColor: '#F0EDFF',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingBottom: 36
  },
  booksRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 7,
    zIndex: 1
  },
  book: {
    width: 38,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF55'
  },
  shelf: {
    height: 15,
    width: '85%',
    backgroundColor: '#C9BDFB',
    borderRadius: 8,
    marginTop: -2
  },
  plant: {
    position: 'absolute',
    top: 25,
    left: 32,
    fontSize: 70,
    color: '#C5B9F5'

  },
  cup: {
    position: 'absolute',
    bottom: 48,
    right: 25,
    fontSize: 39
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

