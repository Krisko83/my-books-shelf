import { View, Text, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { colors } from '../../theme.js'; import { Link } from '@react-navigation/native';
import BookItem from '../components/BookItem.jsx';
import { useForm, Controller } from 'react-hook-form';
import RadioButton from '../components/RadioButton.jsx';
;

const books = [
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 1, title: 'Atomic Habits', author: 'James Clear', status: 'Reading', genre: 'action', cover: '#E8D6B2', ink: '#765B39', mark: 'A' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 2, title: 'Dune', author: 'Frank Herbert', status: 'Read', genre: 'action', cover: '#D88C48', ink: '#35251D', mark: 'D' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 3, title: 'The Midnight Library', author: 'Matt Haig', genre: 'action', status: 'Want to Read', cover: '#27435C', ink: '#FFFFFF', mark: '✦' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 4, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'action', status: 'Read', cover: '#D5B84A', ink: '#342B16', mark: 'P' },
];

export default function HomeScreen() {
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      search: '',
      sort: 'all'
    }
  });

  const submitSortHandler = (data) => {
    console.log(data.sort);

  }

  const submitSearchHandler = (data) => {
    console.log(data.search);

  }

  return (
    <View style={styles.screen}>


      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 28 }}>

        <Controller
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


        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
          <Text style={{ color: colors.text, fontSize: 19, fontWeight: '800' }}>Your Library</Text>

          <Link screen='MainMyBooks'>
            <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>See all</Text>
          </Link>
        </View>

        <View style={styles.libContainer}>
          {books.map(book => (
            <View key={book.id} style={styles.cart} >
              <Link screen='Details' params={{ bookId: book.id }} >
                <BookItem {...book} />
              </Link>
            </View>
          ))}
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
    elevation: 10,
  },
  libContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginHorizontal: 'auto'
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