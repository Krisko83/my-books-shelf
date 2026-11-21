import { View, Text, ScrollView, StyleSheet, Alert, RefreshControl, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { colors } from '../../theme.js';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { bookApi, userApi } from '../api';
import BookItem from '../components/BookItem.jsx';
import ActivityItem from '../components/ActivityItem.jsx';
import Header from '../components/Header.jsx';
import { useAuthContext } from '../contexts/auth/AuthContext.js';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';


export default function HomeScreen({ navigation }) {

  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false)
  const { user, logout } = useAuthContext();
  const [userInfo, setUserInfo] = useState('User');
  const { t } = useTranslation();

  useFocusEffect(

    useCallback(() => {

      const getBooks = async () => {
        setLoading(true)
        try {
          const data = await bookApi.getLastFourBooks();
          setBooks(data);

          const userInfo = await userApi.getUserInfo(user.id)

          setUserInfo(userInfo[0]);

        } catch (err) {
          Alert.alert(err.message)
        } finally {
          setLoading(false)
        }
      };

      getBooks();
    }, [])

  )


  const pressHandler = async (bookId) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    navigation.navigate('Details', { bookId })
  }

  const refreshHandler = async () => {
    setRefreshing(true);

    try {
      const data = await bookApi.getLastFourBooks();
      setBooks(data)
    } catch (err) {
      Alert.alert(err)
    } finally {
      setRefreshing(false)
    }
  }

  const seeAllHandler = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    navigation.navigate('MainMyBooks')
  }

  const goToOtherUsersBookHandler = () => {

  }

  return (
    <>
      <Header {...user} {...userInfo} onLogout={logout} />
      {loading ?
        <ActivityItem />
        :
        <View style={styles.screen}>


          <ScrollView
            contentContainerStyle={{ padding: 20, paddingHorizontal: 10 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
          >


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
              <Text style={{ color: colors.text, fontSize: 19, fontWeight: '800' }}>{t('myLibrary')}</Text>

              {books.length > 4 &&
                <Pressable onPress={seeAllHandler} >
                  <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>{t('seeAll')}</Text>
                </Pressable>
              }

            </View>

            <View style={styles.libContainer}>
              <FlatList
                data={books.slice(0, 4)}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
                renderItem={({ item }) => (
                  <View key={item.id} style={styles.cart}>
                    <Pressable onPress={() => pressHandler(item.id)} >
                      <BookItem {...item} />
                    </Pressable>
                  </View>
                )}
              />

            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={goToOtherUsersBookHandler}
              // disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>Find out what other users read.</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>

        </View>
      }
    </>
  );
}


const styles = StyleSheet.create({
  cart: {
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    elevation: 5,
    flex: 1,
    // padding: 10
    width: 140
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingHorizontal: 15,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 14,
    marginBottom: 17,
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor:
      colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'

  },
})