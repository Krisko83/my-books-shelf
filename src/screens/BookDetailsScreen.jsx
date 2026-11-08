import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '../../theme.js';
import { books } from './MyBookScreen.jsx';
import { Link } from '@react-navigation/native';

export default function BookDetailsScreen({ route }) {
  const id = route.params.bookId;
  const book = books.find(b => b.id === id);

  const ratingStars = '★'.repeat(book.rating)

  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={styles.content}>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 }}> */}
        {/* <Text style={{ fontSize: 22, color: colors.text }}>♡</Text> */}
        {/* </View> */}
        <View style={{ alignItems: 'center' }}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: book.imageUrl }} style={styles.img} />
          </View>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.stars}>{ratingStars}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>✓ {book.status}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.about}>About this book</Text>
          <Text style={styles.description}>{book.description}</Text>
          <View style={styles.genreContainer}>
            <Text style={styles.genre}>Genre</Text><Text style={styles.genreText}>{book.genre}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>Date added</Text><Text style={styles.dateText}>12 October 2026</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>

          <Link style={styles.button} screen='Edit'>
            <Text style={styles.buttonText}>✎  Edit</Text>
          </Link>

          <Link style={[styles.button, { backgroundColor: colors.red }]}>
            <Text style={{ color: colors.redText, fontWeight: '700' }}>▤  Delete</Text>
          </Link>

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
    fontWeight: '700'
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEEF6',
    marginTop: 25
  },
  imgContainer: { width: 280, height: 270, backgroundColor: '#D98B43', borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  img: { width: '100%', height: '100%' },
  title: { color: colors.text, fontSize: 25, fontWeight: '900', marginTop: 22 },
  author: { color: colors.muted, marginTop: 5 },
  stars: { color: colors.gold, fontSize: 20, marginTop: 13 },
  statusContainer: { backgroundColor: colors.green, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7, marginTop: 13 },
  status: { color: colors.greenText, fontSize: 12, fontWeight: '700' },
  about: { color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 9 },
  description: { color: colors.muted, lineHeight: 23, fontSize: 14 },
  genreContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  genre: { color: colors.muted, fontSize: 12 },
  genreText: { color: colors.text, fontWeight: '700', fontSize: 12 },
  dateContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  date: { color: colors.muted, fontSize: 12 },
  dateText: { color: colors.text, fontWeight: '700', fontSize: 12 }
});