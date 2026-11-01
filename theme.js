import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#5944D6',
  primaryDark: '#4330B8',
  background: '#F7F7FC',
  surface: '#FFFFFF',
  text: '#171638',
  muted: '#777895',
  border: '#E6E5F0',
  softPurple: '#EFEDFF',
  green: '#DDF7EE',
  greenText: '#16866B',
  red: '#FFE8EA',
  redText: '#D94B5A',
  gold: '#F4B740',
};

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 36 },
  heading: { color: colors.text, fontSize: 27, fontWeight: '800' },
  subheading: { color: colors.muted, fontSize: 14, marginTop: 6, lineHeight: 21 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 8 },
  input: {
    minHeight: 50, borderWidth: 1, borderColor: colors.border, borderRadius: 13,
    paddingHorizontal: 15, backgroundColor: colors.surface, color: colors.text,
    fontSize: 14, marginBottom: 17,
  },
  button: {
    minHeight: 52, borderRadius: 16, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18,
  },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  outlineButton: {
    minHeight: 50, borderRadius: 15, borderWidth: 1, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16,
  },
  outlineButtonText: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  card: {
    backgroundColor: colors.surface, borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: '#EFEEF6',
  },
});
