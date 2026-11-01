import { View, Text, TextInput, ScrollView, StatusBar } from 'react-native';
import { colors, common } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context'

const books = [
  { title: 'Atomic Habits', author: 'James Clear', status: 'Reading', cover: '#E8D6B2', ink: '#765B39', mark: 'A' },
  { title: 'Dune', author: 'Frank Herbert', status: 'Read', cover: '#D88C48', ink: '#35251D', mark: 'D' },
  { title: 'The Midnight Library', author: 'Matt Haig', status: 'Want to Read', cover: '#27435C', ink: '#FFFFFF', mark: '✦' },
  { title: 'Project Hail Mary', author: 'Andy Weir', status: 'Read', cover: '#D5B84A', ink: '#342B16', mark: 'P' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={common.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={{ paddingHorizontal: 20, paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 23, fontWeight: '900', color: colors.text }}>MyBookShelf</Text>
        <Text style={{ fontSize: 22 }}>♧   <Text style={{ fontSize: 17 }}>👤</Text></Text>
      </View>
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
          <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>See all</Text>
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
      <View style={{ height: 66, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: colors.border, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {['⌂\nHome', '▤\nMy Books', '+\nAdd', '▥\nStats', '⚙\nProfile'].map((item, i) => <Text key={item} style={{ textAlign: 'center', color: i === 0 ? colors.primary : colors.muted, fontSize: 11, fontWeight: i === 0 ? '800' : '500', lineHeight: 18 }}>{item}</Text>)}
      </View>
    </SafeAreaView>
  );
}
