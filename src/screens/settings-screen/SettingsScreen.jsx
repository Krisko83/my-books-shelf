import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';


const settings = [
  ['♧', 'Notifications', 'On'],
  ['▧', 'Dark Mode', 'Off'],
  ['◎', 'Language', 'English   ›'],
  ['ⓘ', 'About App', '›'],
];

export default function SettingsScreen() {
  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.heading, { textAlign: 'center', marginBottom: 25 }]}>Settings</Text>
        <View style={[styles.card, { paddingVertical: 3 }]}>
          {settings.map(([icon, label, value], i) => (
            <View key={label} style={{ minHeight: 64, flexDirection: 'row', alignItems: 'center', borderBottomWidth: i === settings.length - 1 ? 0 : 1, borderBottomColor: colors.border }}>
              <Text style={{ width: 38, fontSize: 20, color: colors.primary }}>{icon}</Text>
              <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600', flex: 1 }}>{label}</Text>
              {i < 2 ? (
                <View style={{ width: 43, height: 25, borderRadius: 15, backgroundColor: value === 'On' ? colors.primary : '#DADAE5', justifyContent: 'center', padding: 3, alignItems: value === 'On' ? 'flex-end' : 'flex-start' }}>
                  <View style={{ width: 19, height: 19, borderRadius: 10, backgroundColor: '#FFF' }} />
                </View>
              ) : <Text style={{ color: colors.muted, fontSize: 13 }}>{value}</Text>}
            </View>
          ))}
        </View>
        <View style={[styles.button, { marginTop: 28 }]}><Text style={styles.buttonText}>Save Settings</Text></View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%'
  },
  content: {
    padding: 22,
    paddingBottom: 36
  },
  heading: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800'
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8
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
