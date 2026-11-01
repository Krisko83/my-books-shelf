import { View, Text, ScrollView, StatusBar } from 'react-native';
import { colors, common } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookDetailsScreen() {
  return (
    <SafeAreaView style={common.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={common.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>‹</Text>
          <Text style={{ fontSize: 22, color: colors.text }}>♡</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 190, height: 270, backgroundColor: '#D98B43', borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
            <Text style={{ fontSize: 45, color: '#3C281B', fontWeight: '900' }}>DUNE</Text>
            <Text style={{ color: '#3C281B', fontSize: 13, marginTop: 12 }}>FRANK HERBERT</Text>
          </View>
          <Text style={{ color: colors.text, fontSize: 25, fontWeight: '900', marginTop: 22 }}>Dune</Text>
          <Text style={{ color: colors.muted, marginTop: 5 }}>Frank Herbert</Text>
          <Text style={{ color: colors.gold, fontSize: 20, marginTop: 13 }}>★★★★☆ <Text style={{ color: colors.text, fontSize: 13 }}>4.5 (12 reviews)</Text></Text>
          <View style={{ backgroundColor: colors.green, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7, marginTop: 13 }}>
            <Text style={{ color: colors.greenText, fontSize: 12, fontWeight: '700' }}>✓  Read</Text>
          </View>
        </View>
        <View style={[common.card, { marginTop: 25 }]}>
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 9 }}>About this book</Text>
          <Text style={{ color: colors.muted, lineHeight: 23, fontSize: 14 }}>On the desert planet Arrakis, the source of the most valuable substance in the universe, a young heir discovers his destiny.</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={{ color: colors.muted, fontSize: 12 }}>Genre</Text><Text style={{ color: colors.text, fontWeight: '700', fontSize: 12 }}>Science Fiction</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <Text style={{ color: colors.muted, fontSize: 12 }}>Date added</Text><Text style={{ color: colors.text, fontWeight: '700', fontSize: 12 }}>12 October 2026</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>
          <View style={[common.button, { flex: 1 }]}><Text style={common.buttonText}>✎  Edit</Text></View>
          <View style={{ flex: 1, borderRadius: 16, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.redText, fontWeight: '700' }}>▤  Delete</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
