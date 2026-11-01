import { View, Text, ScrollView, StatusBar } from 'react-native';
import { colors, common } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const rows = ['My Library', 'Reading Statistics', 'Settings', 'Help & Support', 'About MyBookShelf'];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={common.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={common.content}>
        <View style={{ alignItems: 'center', marginTop: 25, marginBottom: 28 }}>
          <View style={{ width: 94, height: 94, borderRadius: 47, backgroundColor: colors.softPurple, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.primary }}>
            <Text style={{ fontSize: 39 }}>👤</Text>
          </View>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 13 }}>John Doe</Text>
          <Text style={{ color: colors.muted, fontSize: 13, marginTop: 4 }}>john.doe@example.com</Text>
        </View>
        <View style={[common.card, { paddingVertical: 4 }]}>
          {rows.map((row, i) => (
            <View key={row} style={{ minHeight: 57, flexDirection: 'row', alignItems: 'center', borderBottomWidth: i === rows.length - 1 ? 0 : 1, borderBottomColor: colors.border }}>
              <Text style={{ color: colors.primary, fontSize: 19, width: 36 }}>{['▤', '▥', '⚙', '?', 'ⓘ'][i]}</Text>
              <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600', flex: 1 }}>{row}</Text>
              <Text style={{ color: colors.muted, fontSize: 22 }}>›</Text>
            </View>
          ))}
        </View>
        <View style={[common.outlineButton, { marginTop: 24 }]}><Text style={common.outlineButtonText}>⇥  Log Out</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}
