import { View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Pressable, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { colors } from '../../theme.js';
import { Controller, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import EyeIcon from '../components/EyeIcon.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthContext } from '../contexts/auth/AuthContext.js';
import { authApi } from '../api/index.js';
import ActivityItem from '../components/ActivityItem.jsx';
import * as Haptics from 'expo-haptics';
import Header from '../components/Header.jsx';
import { useTranslation } from 'react-i18next';

export default function LoginScreen({ navigation, route }) {
  const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);
  const secondInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const inputPath = route?.params.inputPath;
  const { t } = useTranslation()

  if (loading) {
    return (
      <ActivityItem action={`${t('Signing...')}`} />
    )
  }

  const submitHandler = async (data) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    Keyboard.dismiss();

    setLoading(true);

    try {
      const userData = await authApi.login(data)

      login(userData);

      reset()
    } catch (err) {
      Alert.alert(err.message)
    } finally {
      setLoading(false);
    }

  }

  const switchPasswordVisibility = (field) => {

    setIsPasswordVisible(state => ({
      ...state,
      [field]: isPasswordVisible[field] ? false : true
    }))
  }


  const handleFirstFocus = () => {
    emailInputRef.current?.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current?.scrollTo({
          y: y + 200,
          animated: true
        });
      },
    );
  };

  const goToRegisterHandler = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

    if (inputPath !== 'Welcome') {
      navigation.goBack()
    } else {
      navigation.navigate('Register', { inputPath: 'Register' })
    }
  }

  return (

    <>
      <Header screenName='Login' />
      <View style={styles.screen}>
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>

          <ScrollView
            contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 65 }]}
            keyboardShouldPersistTaps="handled"
            ref={scrollViewRef}
          >

            <View style={{ alignItems: 'center', marginBottom: 34 }}>
              <Text style={{ fontSize: 80, color: colors.primary }}>&#128214;</Text>
              <Text style={{ fontSize: 23, fontWeight: '900', color: colors.text }}>My BookShelf</Text>
            </View>

            <Text style={styles.heading}>{t('welcomeBack')}</Text>

            <Text style={styles.subheading}>{t('signInToYourAccount')}</Text>

            <View onFocus={handleFirstFocus}>

              <Text style={styles.label}>{t('emailAddress')}</Text>

              <Controller
                control={control}
                name='email'
                rules={{
                  required: `${t('emailIsRequired')}`,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: `${t('invalidEmailAddress')}`
                  }
                }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    ref={emailInputRef}
                    submitBehavior="submit"
                    style={styles.input}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.muted}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    onSubmitEditing={() => secondInputRef.current?.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                )}
              />

              {errors.email &&
                <Text style={styles.error}>{errors.email.message}</Text>
              }

              <Text style={styles.label}>{t('password')}</Text>

              <Controller
                control={control}
                name='password'
                rules={{
                  required: `${t('passwordIsRequired')}`,
                  minLength: {
                    value: 6,
                    message: `${t('passwordShouldBeAtLeast6CharactersLong')}!`
                  }
                }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={secondInputRef}
                      submitBehavior="submit"
                      style={[styles.input, { flex: 1 }]}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={handleSubmit(submitHandler)}
                      placeholder={t('enterYourPassword')}
                      placeholderTextColor={colors.muted}
                      secureTextEntry={!isPasswordVisible['password']}
                      autoCapitalize="none"
                    />

                    <Pressable
                      onPress={() => switchPasswordVisibility('password')}
                      style={styles.eyeIcon}
                    >
                      <EyeIcon isVisible={isPasswordVisible['password']} />
                    </Pressable>
                  </View>
                )}
              />

              {errors.password &&
                <Text style={styles.error}>{errors.password.message}</Text>
              }

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={handleSubmit(submitHandler)}
                disabled={isSubmitting}>
                <Text style={styles.buttonText}>{isSubmitting ? `${t('signing')}...` : `${t('signIn')}`}</Text>
              </TouchableOpacity>
            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 3 }}>
              <Text style={{ textAlign: 'center', color: colors.muted, marginTop: 28, fontSize: 13 }}>{`${t('dontHaveAnAccount')}?`}</Text>
              <Pressable onPress={() => goToRegisterHandler()}>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>{t('registerAccount')}</Text>
              </Pressable>
            </View>


          </ScrollView>

        </KeyboardAvoidingView>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
  },
  content: {
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 36,
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800'
  },
  subheading: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 28,
    lineHeight: 21
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8
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
    marginBottom: 20,
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor:
      colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'

  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputEye: {
    flex: 1,
  },

  eyeIcon: {
    position: 'absolute',
    right: 15,
    paddingBottom: 14,
  },

});
