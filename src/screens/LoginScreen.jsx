import { View, Text, TextInput, ScrollView, StatusBar, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form';


export default function LoginScreen() {
  const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const submitHandler = (data) => {
    console.log(data);

    reset()
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior='padding'>

        <ScrollView contentContainerStyle={[styles.content, { flexGrow: 1, justifyContent: 'center' }]} keyboardShouldPersistTaps="handled">

          <View style={{ alignItems: 'center', marginBottom: 42 }}>
            <Text style={{ fontSize: 45, color: colors.primary }}>&#128214;</Text>
            <Text style={{ fontSize: 23, fontWeight: '900', color: colors.text }}>My BookShelf</Text>
          </View>

          <Text style={styles.heading}>Welcome Back</Text>

          <Text style={styles.subheading}>Sign in to your account</Text>

          <Text style={styles.label}>Email address</Text>

          <Controller
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
          />

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
              <TextInput
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(submitHandler)}
                placeholder="Enter your password"
                placeholderTextColor={colors.muted}
                secureTextEntry
              />
            )}
          />

          {errors.password &&
            <Text style={styles.error}>{errors.password.message}</Text>
          }
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
          <Text style={{ color: colors.muted, fontSize: 13 }}>□  Remember me</Text>
          <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '700' }}>Forgot password?</Text>
        </View> */}
          <Pressable
            style={styles.button}
            onPress={handleSubmit(submitHandler)}
            disabled={isSubmitting}>
            <Text style={styles.buttonText}>{isSubmitting ? 'Signing...' : 'Sign In'}</Text>
          </Pressable>

          <Pressable onPress={() => console.log('Sign Up')}>
            <Text style={{ textAlign: 'center', color: colors.muted, marginTop: 28, fontSize: 13 }}>Don't have an account? <Text style={{ color: colors.primary, fontWeight: '700' }}>Register</Text></Text>
          </Pressable>
        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
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
    marginBottom: 17,
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
  outlineButton: {
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});
