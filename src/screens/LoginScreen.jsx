import { View, Text, TextInput, ScrollView, StatusBar, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native';
import { colors } from '../../theme.js';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import EyeIcon from '../components/EyeIcon.jsx';
import InputController from '../components/InputController.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function LoginScreen({ navigation }) {
  const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const submitHandler = (data) => {
    console.log(data);

    reset()
  }

  const switchPasswordVisibility = (field) => {

    setIsPasswordVisible(state => ({
      ...state,
      [field]: isPasswordVisible[field] ? false : true
    }))
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView behavior='padding' >

        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 30 }]} keyboardShouldPersistTaps="handled">

          <View style={{ alignItems: 'center', marginBottom: 34 }}>
            <Text style={{ fontSize: 80, color: colors.primary }}>&#128214;</Text>
            <Text style={{ fontSize: 23, fontWeight: '900', color: colors.text }}>My BookShelf</Text>
          </View>

          <Text style={styles.heading}>Welcome Back</Text>

          <Text style={styles.subheading}>Sign in to your account</Text>

          <Text style={styles.label}>Email address</Text>

          <InputController
            control={control}
            name='email'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            }}
            placeholder="you@example.com"
            handleSubmit={handleSubmit(submitHandler)}
            keyboardType="email-address"
          />

          {/* <Controller
            control={control}
            name='email'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={colors.muted}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(submitHandler)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          /> */}

          {errors.email &&
            <Text style={styles.error}>{errors.email.message}</Text>
          }

          <Text style={styles.label}>Password</Text>

          <Controller
            control={control}
            name='password'
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be at least 6 characters long!'
              }
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(submitHandler)}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!isPasswordVisible['password']}
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

          <Pressable
            style={styles.button}
            onPress={handleSubmit(submitHandler)}
            disabled={isSubmitting}>
            <Text style={styles.buttonText}>{isSubmitting ? 'Signing...' : 'Sign In'}</Text>
          </Pressable>
 
        </ScrollView>

      </KeyboardAvoidingView>
    </View>
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
    flex: 1,
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
