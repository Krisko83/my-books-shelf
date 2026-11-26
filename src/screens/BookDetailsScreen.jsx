import { View, Text, ScrollView, StyleSheet, Image, RefreshControl, Alert, Pressable, TouchableOpacity } from 'react-native';
import { colors } from '../../theme.js';
import { Link, useFocusEffect } from '@react-navigation/native';
import { use, useCallback, useEffect, useState } from 'react';
import { bookApi } from '../api';
import convertDate from '../utils/convertDate.js';
import ActivityItem from '../components/ActivityItem.jsx';
import * as Haptics from 'expo-haptics';
import Header from '../components/Header.jsx';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { useTranslation } from 'react-i18next';


export default function BookDetailsScreen({ navigation, route }) {
  const [book, setBook] = useState({})
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const bookId = route.params.bookId;
  const { user } = use(AuthContext);
  const { t } = useTranslation();
  
  const isOwner = book.user_id === user.id;
  
  const statusMap = {
    'want-to-read': `${t('wantToRead')}`,
    'read': `${t('read')}`,
    'reading': `${t('reading')}`
  }

  
  useFocusEffect(
    useCallback(() => {
      const getBookDetails = async () => {
        setLoading(true)

        try {
          const result = await bookApi.getBookById(bookId)

          setBook(result[0])
        } catch (err) {
          Alert.alert(err)
        } finally {
          setLoading(false)
        }
      }

      getBookDetails();
    }, [])
  )



  if (loading) {
    return <ActivityItem />
  }

  const ratingStars = '★'.repeat(book?.rating);

  const refreshHandler = async () => {
    setRefreshing(true);

    try {
      const data = await bookApi.getBookById(bookId);

      setBook(data[0]);

    } catch (err) {
      Alert.alert(err)
    } finally {
      setRefreshing(false)
    }

  }

  const deleteHandler = async (bookId) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

    Alert.alert(
      `${t('confirmation')}`,
      `${t('areYouSureYouWantToDeleteThisBook')}?`,
      [
        {
          text: `${t('cancel')}`,
          style: 'cancel',
          onPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          }
        },
        {
          text: `${t('yes')}`,
          style: 'destructive',
          onPress: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            try {
              setLoading(true);

              await bookApi.deleteBook(bookId)

              navigation.goBack()
            } catch (err) {
              Alert.alert(err.message)
            } finally {
              setLoading(false)
            }
          },
        },
      ]
    );

  };

  const editHandler = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    navigation.navigate('AddEdit', { bookId, inputPath: 'Edit' })
  }


  return (
    <View style={styles.screen}>
      <Header screenName={t('details')} />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
      >
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 }}> */}
        {/* <Text style={{ fontSize: 22, color: colors.text }}>♡</Text> */}
        {/* </View> */}
        <View style={{ alignItems: 'center' }}>

          <View style={styles.imgContainer}>
            <Image source={{ uri: book.imageUrl }} style={styles.img} />
          </View>

          <Text style={styles.title}>{book.title}</Text>

          <Text>{t('author')}: <Text style={styles.author}>{book.author}</Text></Text>

          <Text>{t('rating')}: <Text style={styles.stars}>{ratingStars}</Text></Text>


          <View style={styles.statusContainer}>
            <Text style={styles.status}>✓ {statusMap[book.status]}</Text>
          </View>

        </View>

        <View style={styles.card}>

          <Text style={styles.about}>{t('description')}: </Text>
          <Text style={styles.description}>{book.description}</Text>

          <View style={styles.genreContainer}>
            <Text style={styles.genre}>{t('genre')}</Text><Text style={styles.genreText}>{book.genre}</Text>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.date}>{t('dateAdded')}</Text><Text style={styles.dateText}>{convertDate(book.created_at)}</Text>
          </View>

        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>

          {isOwner &&
            <>
              <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={editHandler} >
                <Text style={styles.buttonText}>✎  {t('edit')}</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={[styles.button, { backgroundColor: colors.red }]} onPress={() => deleteHandler(bookId)}>
                <Text style={[styles.buttonText, { color: colors.redText, fontWeight: '700' }]}>▤  {t('delete')}</Text>
              </TouchableOpacity>
            </>
          }

        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 30
  },
  content: {
    padding: 22,
    paddingBottom: 36
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
    flex: 1,
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    textAlign: 'center',
    paddingVertical: 15
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEEF6',
    marginTop: 25
  },
  imgContainer: {
    width: 280,
    height: 270,
    backgroundColor: '#D98B43',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  img: {
    width: '100%',
    height: '100%'
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 22,
    justifyContent: 'center'
  },
  author: {
    color: colors.muted,
    marginTop: 5
  },
  stars: {
    color: colors.gold,
    fontSize: 20, marginTop: 13
  },
  statusContainer: {
    backgroundColor: colors.green,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginTop: 13
  },
  status: {
    color: colors.greenText,
    fontSize: 12,
    fontWeight: '700'
  },
  about: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 9
  },
  description: {
    color: colors.muted,
    lineHeight: 23,
    fontSize: 14
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  genreText: {
    color: colors.muted,
    fontSize: 12
  },
  genre: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 12
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  dateText: {
    color: colors.muted,
    fontSize: 12
  },
  date: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 12
  }
});