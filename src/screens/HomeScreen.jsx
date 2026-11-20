import { View, Text, ScrollView, StyleSheet, Alert, RefreshControl, FlatList, Pressable } from 'react-native';
import { colors } from '../../theme.js';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { bookApi, userApi } from '../api';
import BookItem from '../components/BookItem.jsx';
import ActivityItem from '../components/ActivityItem.jsx';
import UserHeader from '../components/UserHeader.jsx';
import { useAuthContext } from '../contexts/auth/AuthContext.js';
import * as Haptics from 'expo-haptics';


export default function HomeScreen({ navigation }) {

  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false)
  const { user, logout } = useAuthContext();
  const [userInfo, setUserInfo] = useState('User');

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

  // if (loading) {
  //   return <ActivityItem />
  // }

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

  return (
    <>
      <UserHeader {...user} {...userInfo} onLogout={logout} />
      {loading ?
        <ActivityItem />
        :
        <View style={styles.screen}>


          <ScrollView
            contentContainerStyle={{ padding: 20, paddingHorizontal: 10 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
          >


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
              <Text style={{ color: colors.text, fontSize: 19, fontWeight: '800' }}>Your Library</Text>

              <Pressable onPress={seeAllHandler} >
                <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>See all</Text>
              </Pressable>
            </View>

            <View style={styles.libContainer}>
              <FlatList
                data={books}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
                renderItem={({ item }) => (
                  <View key={item.id} style={styles.cart}   >
                    <Pressable onPress={() => pressHandler(item.id)} >
                      <BookItem {...item} />
                    </Pressable>
                  </View>
                )}
              />
              {/* {books.map(book => (
            <View key={book.id} style={styles.cart} >
            <Link screen='Details' params={{ bookId: book.id }} >
            <BookItem {...book} />
            </Link>
            </View>
          ))} */}
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
})