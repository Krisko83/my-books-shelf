import { View, Text, TextInput, ScrollView, StatusBar } from 'react-native';
import { colors, common } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RegisterScreen() {
  return (
    <SafeAreaView style={common.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={common.content} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center', marginTop: 22, marginBottom: 34 }}>
          <Text style={{ fontSize: 43, color: colors.primary }}>▤</Text>
          <Text style={{ fontSize: 23, fontWeight: '900', color: colors.text }}>My BookShelf</Text>
        </View>
        <Text style={common.heading}>Create Account</Text>
        <Text style={common.subheading}>Start building your personal library</Text>
        <View style={{ height: 26 }} />
        {[
          ['Email address', 'you@example.com', false],
          ['Password', 'Create a password', true],
          ['Confirm password', 'Repeat your password', true],
        ].map(([label, placeholder, secure]) => (
          <View key={label}>
            <Text style={common.label}>{label}</Text>
            <TextInput style={common.input} placeholder={placeholder} placeholderTextColor={colors.muted} secureTextEntry={secure} autoCapitalize="none" />
          </View>
        ))}
        <View style={[common.button, { marginTop: 8 }]}><Text style={common.buttonText}>Create Account</Text></View>
        <Text style={{ textAlign: 'center', color: colors.muted, marginTop: 25, fontSize: 13 }}>Already have an account? <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign In</Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
}
