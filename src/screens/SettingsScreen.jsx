import { View, Text, ScrollView, StatusBar } from 'react-native';
import { colors, common } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';


const settings = [
  ['♧', 'Notifications', 'On'],
  ['▧', 'Dark Mode', 'Off'],
  ['◎', 'Language', 'English   ›'],
  ['ⓘ', 'About App', '›'],
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={common.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={common.content}>
        <Text style={[common.heading, { textAlign: 'center', marginBottom: 25 }]}>Settings</Text>
        <View style={[common.card, { paddingVertical: 3 }]}>
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
        <View style={[common.button, { marginTop: 28 }]}><Text style={common.buttonText}>Save Settings</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}
