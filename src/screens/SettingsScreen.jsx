import { View, Text, ScrollView, StatusBar, StyleSheet, Switch } from 'react-native';
import { colors } from '../../theme.js';
import Header from '../components/Header.jsx';
import { useTranslation } from 'react-i18next';
import { use, useEffect, useState } from 'react';
import { UserSettingsContext } from '../contexts/auth/UserSettingsContext.js';
import { Picker } from '@react-native-picker/picker';



export default function SettingsScreen() {

  const { t } = useTranslation();
  const { settings, saveSettings } = use(UserSettingsContext);


  const [userSettings, setUserSettings] = useState(settings);


  const toggleSwitch = (name) => {

    const updatedData = {
      ...userSettings,
      [name]: !userSettings[name]
    }
    setUserSettings(updatedData)
    saveSettings(updatedData)
  }

 
  const changeLanguageHandler = (value) => {    
    const updatedData = {
      ...userSettings,
      language: value
    }

    setUserSettings(updatedData)
    saveSettings(updatedData)
  }
 

  return (
    <>
      <Header screenName={`${t('settings')}`} />
      <View style={styles.screen}>

        <ScrollView contentContainerStyle={styles.content}>

          <View style={styles.card}>
            <View style={{ minHeight: 64, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>

              <Text style={{ width: 38, fontSize: 20, color: colors.primary }}>🕭</Text>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', flex: 1 }}>{t('notifications')}</Text>

              <Switch
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={userSettings ? 'white' : '#f1ecf1'}
                onValueChange={() => toggleSwitch('notifications')}
                value={userSettings.notifications}
              />

            </View>

          </View>

          <View style={styles.card}>
            <View style={{ minHeight: 64, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>

              <Text style={{ width: 38, fontSize: 20, color: colors.primary }}>⚫</Text>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', flex: 1 }}>{t('darkMode')}</Text>

              <Switch
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={userSettings ? 'white' : '#f1ecf1'}
                onValueChange={() => toggleSwitch('darkMode')}
                value={userSettings.darkMode}
              />

            </View>

          </View>


          <View style={styles.card}>
            <View style={{ minHeight: 64, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>

              <Text style={{ width: 38, fontSize: 20, color: colors.primary }}>🗣</Text>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', flex: 1 }}>{t('language')}</Text>

              <View style={styles.pickerContainer}>

                <Picker
                  selectedValue={userSettings.language}
                  onValueChange={(value) => changeLanguageHandler(value)}
                  style={styles.picker}
                >

                  <Picker.Item label='English' value='en' />
                  <Picker.Item label='Български' value='bg' />
                </Picker>
              </View>

            </View>

          </View>

          {/* <View style={[styles.card, { paddingVertical: 3 }]}>
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
          </View> */}

          {/* <View style={[styles.button, { marginTop: 28 }]}><Text style={styles.buttonText}>Save Settings</Text></View> */}
        </ScrollView>
      </View>
    </>
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
    paddingBottom: 36,
    gap: 10
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
    height: 60,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFEEF6',
  },
  pickerContainer: {
    height: 55,
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DDD4',
    borderWidth: 0,
  },

  picker: {
    height: 60,
    width: '100%',
    color: '#3E3026',
    marginTop: -2,
  },
});
