import { View, Text, TextInput, ScrollView } from 'react-native';
import { colors, common } from '../../theme.js'; import { Link } from '@react-navigation/native';
;

const books = [
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 1, title: 'Atomic Habits', author: 'James Clear', status: 'Reading', genre: 'action', cover: '#E8D6B2', ink: '#765B39', mark: 'A' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 2, title: 'Dune', author: 'Frank Herbert', status: 'Read', genre: 'action', cover: '#D88C48', ink: '#35251D', mark: 'D' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 3, title: 'The Midnight Library', author: 'Matt Haig', genre: 'action', status: 'Want to Read', cover: '#27435C', ink: '#FFFFFF', mark: '✦' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 4, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'action', status: 'Read', cover: '#D5B84A', ink: '#342B16', mark: 'P' },
];

export default function HomeScreen() {

  return (
    <View style={common.screen}>


      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 28 }}>
        <TextInput style={[common.input, { marginTop: 18, marginBottom: 15 }]} placeholder="⌕  Search books..." placeholderTextColor={colors.muted} />
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 22 }}>
          {['All', 'Reading', 'Want to Read', 'Read'].map((item, i) => (
            <View key={item} style={{ paddingVertical: 9, paddingHorizontal: 13, borderRadius: 20, backgroundColor: i === 0 ? colors.primary : '#ECEBF5' }}>
              <Text style={{ color: i === 0 ? '#FFF' : colors.muted, fontSize: 11, fontWeight: '700' }}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
          <Text style={{ color: colors.text, fontSize: 19, fontWeight: '800' }}>Your Library</Text>
          <Link screen='MainMyBooks'>
            <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>See all</Text>
          </Link>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 18 }}>
          {books.map(book => (
            <View key={book.title} style={{ width: '48%', backgroundColor: colors.surface, borderRadius: 17, padding: 9, borderWidth: 1, borderColor: '#EFEEF6' }}>
              <View style={{ height: 150, backgroundColor: book.cover, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: book.ink, fontSize: 45, fontWeight: '900' }}>{book.mark}</Text>
                <Text style={{ color: book.ink, fontSize: 13, fontWeight: '800', marginTop: 5 }}>{book.title}</Text>
              </View>
              <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '800', fontSize: 13, marginTop: 10 }}>{book.title}</Text>
              <Text style={{ color: colors.muted, fontSize: 11, marginTop: 3 }}>{book.author}</Text>
              <View style={{ alignSelf: 'flex-start', backgroundColor: book.status === 'Want to Read' ? colors.softPurple : colors.green, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, marginTop: 9 }}>
                <Text style={{ color: book.status === 'Want to Read' ? colors.primary : colors.greenText, fontSize: 10, fontWeight: '700' }}>{book.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}
