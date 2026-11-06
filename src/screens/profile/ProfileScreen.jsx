import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const rows = ['My Library', 'Reading Statistics', 'Settings', 'Help & Support', 'About MyBookShelf'];

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ alignItems: 'center', marginTop: 25, marginBottom: 28 }}>
          <View style={{ width: 94, height: 94, borderRadius: 47, backgroundColor: colors.softPurple, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.primary }}>
            <Text style={{ fontSize: 39 }}>👤</Text>
          </View>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 13 }}>John Doe</Text>
          <Text style={{ color: colors.muted, fontSize: 13, marginTop: 4 }}>john.doe@example.com</Text>
        </View>
        <View style={[styles.card, { paddingVertical: 4 }]}>
          {rows.map((row, i) => (
            <View key={row} style={{ minHeight: 57, flexDirection: 'row', alignItems: 'center', borderBottomWidth: i === rows.length - 1 ? 0 : 1, borderBottomColor: colors.border }}>
              <Text style={{ color: colors.primary, fontSize: 19, width: 36 }}>{['▤', '▥', '⚙', '?', 'ⓘ'][i]}</Text>
              <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600', flex: 1 }}>{row}</Text>
              <Text style={{ color: colors.muted, fontSize: 22 }}>›</Text>
            </View>
          ))}
        </View>
        <View style={[styles.outlineButton, { marginTop: 24 }]}><Text style={styles.outlineButtonText}>⇥  Log Out</Text></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%'
  },
  content: {
    padding: 22,
    paddingBottom: 36
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
  outlineButton: {
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: 14,
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

