import { View, Text, TextInput, ScrollView, StatusBar } from 'react-native';
import { colors, common } from '../../../theme.js';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddBookScreen() {


  return (
    <SafeAreaView style={common.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={common.content} keyboardShouldPersistTaps="handled">
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 25 }}>Add Book</Text>
        <View style={{ height: 125, width: 125, borderRadius: 18, backgroundColor: '#ECEBF5', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
          <Text style={{ fontSize: 32, color: colors.primary }}>▧</Text>
          <Text style={{ color: colors.muted, fontSize: 12, marginTop: 6 }}>Add Cover</Text>
        </View>
        {[
          ['Title *', 'Enter book title'],
          ['Author *', 'Enter author name'],
          ['Description', 'Write a short description'],
        ].map(([label, placeholder]) => (
          <View key={label}>
            <Text style={common.label}>{label}</Text>
            <TextInput style={common.input} placeholder={placeholder} placeholderTextColor={colors.muted} />
          </View>
        ))}
        <Text style={common.label}>Genre</Text>
        <View style={[common.input, { justifyContent: 'center' }]}><Text style={{ color: colors.muted }}>Select genre                         ⌄</Text></View>
        <Text style={common.label}>Reading status</Text>
        <View style={{ flexDirection: 'row', gap: 7, marginBottom: 20 }}>
          {['Want to Read', 'Reading', 'Read'].map((x, i) => <View key={x} style={{ flex: 1, paddingVertical: 12, borderRadius: 11, backgroundColor: i === 1 ? colors.primary : '#ECEBF5', alignItems: 'center' }}><Text style={{ color: i === 1 ? '#FFF' : colors.muted, fontSize: 10, fontWeight: '700' }}>{x}</Text></View>)}
        </View>
        <Text style={common.label}>Your rating</Text>
        <Text style={{ color: colors.gold, fontSize: 29, marginBottom: 22 }}>★ ★ ★ ☆ ☆</Text>
        <View style={common.button}><Text style={common.buttonText}>Save Book</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}
