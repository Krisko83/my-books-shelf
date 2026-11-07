import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme.js';
import { books } from './MyBookScreen.jsx';

export default function BookDetailsScreen({ route }) {
  const id = route.params.bookId;
  const book = books[id]
 
  const ratingStars = '★'.repeat(book.rating)
  
  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 }}>
          {/* <Text style={{ fontSize: 22, color: colors.text }}>♡</Text> */}
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 280, height: 270, backgroundColor: '#D98B43', borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
            <Image source={{ uri: book.imageUrl}} style={{width: '100%', height: '100%'}}/>
          </View>
          <Text style={{ color: colors.text, fontSize: 25, fontWeight: '900', marginTop: 22 }}>{book.title}</Text>
          <Text style={{ color: colors.muted, marginTop: 5 }}>{book.author}</Text>
          <Text style={{ color: colors.gold, fontSize: 20, marginTop: 13 }}>{ratingStars}<Text style={{ color: colors.text, fontSize: 13 }}>{book.rating}</Text></Text>
          <View style={{ backgroundColor: colors.green, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7, marginTop: 13 }}>
            <Text style={{ color: colors.greenText, fontSize: 12, fontWeight: '700' }}>✓ {book.status}</Text>
          </View>
        </View>
        <View style={[styles.card, { marginTop: 25 }]}>
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 9 }}>About this book</Text>
          <Text style={{ color: colors.muted, lineHeight: 23, fontSize: 14 }}>{book.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ color: colors.muted, fontSize: 12 }}>Genre</Text><Text style={{ color: colors.text, fontWeight: '700', fontSize: 12 }}>{book.genre}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <Text style={{ color: colors.muted, fontSize: 12 }}>Date added</Text><Text style={{ color: colors.text, fontWeight: '700', fontSize: 12 }}>12 October 2026</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>
          <View style={[styles.button, { flex: 1 }]}><Text style={styles.buttonText}>✎  Edit</Text></View>
          <View style={{ flex: 1, borderRadius: 16, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.redText, fontWeight: '700' }}>▤  Delete</Text></View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
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
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEEF6',
  },
});