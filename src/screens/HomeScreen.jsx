import { View, Text, TextInput, ScrollView, StyleSheet, Alert, RefreshControl, FlatList } from 'react-native';
import { colors } from '../../theme.js'; import { Link } from '@react-navigation/native';
import BookItem from '../components/BookItem.jsx';
import { useForm, Controller } from 'react-hook-form';
import RadioButton from '../components/RadioButton.jsx';
import { useEffect, useState } from 'react';
import { bookApi } from '../api';



export default function HomeScreen() {
  // const { control, handleSubmit } = useForm({
  //   mode: 'onBlur',
  //   reValidateMode: 'onChange',
  //   defaultValues: {
  //     search: '',
  //     sort: 'all'
  //   }
  // });

  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    bookApi.getLastFourBooks()
      .then(setBooks)
      .catch(err => Alert.alert(err))
  }, [])

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

  // const submitSortHandler = (data) => {
  //   console.log(data.sort);

  // }

  // const submitSearchHandler = (data) => {
  //   console.log(data.search);

  // }

  return (
    <View style={styles.screen}>


      <ScrollView
        contentContainerStyle={{ padding: 20, paddingHorizontal: 10 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
      >

        {/* <Controller
          control={control}
          name='search'
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { marginTop: 18, marginBottom: 15 }]}
              placeholder="⌕  Search books..."
              placeholderTextColor={colors.muted}
              onSubmitEditing={handleSubmit(submitSearchHandler)}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View>

          <Controller
            control={control}
            name='sort'
            render={({ field: { onChange, value } }) => (
              <View style={{ flexDirection: 'row', gap: 5, marginBottom: 22 }}>
                <RadioButton
                  label='All'
                  selected={value === 'all'}
                  onPress={() => {
                    onChange('all')
                    submitSortHandler({ sort: 'all' })
                  }}
                />

                <RadioButton
                  label='Reading'
                  selected={value === 'reading'}
                  onPress={() => {
                    onChange('reading')
                    submitSortHandler({ sort: 'reading' })
                  }}
                />

                <RadioButton
                  label='Want to Read'
                  selected={value === 'want-to-read'}
                  onPress={() => {
                    onChange('want-to-read')
                    submitSortHandler({ sort: 'want-to-read' })
                  }}
                />

                <RadioButton
                  label='Read'
                  selected={value === 'read'}
                  onPress={() => {
                    onChange('read')
                    submitSortHandler({ sort: 'read' })
                  }}
                />
              </View>
            )}
          />


        </View> */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
          <Text style={{ color: colors.text, fontSize: 19, fontWeight: '800' }}>Your Library</Text>

          <Link screen='MainMyBooks'>
            <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>See all</Text>
          </Link>
        </View>

        <View style={styles.libContainer}>
          <FlatList
            data={books}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={{gap: 10, paddingHorizontal: 10}}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.cart}   >
                <Link screen='Details' params={{ bookId: item.id }} >
                  <BookItem {...item} />
                </Link>
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
  );
}


const styles = StyleSheet.create({
  cart: {
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    elevation: 5, 
    flex: 1
    // padding: 10

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