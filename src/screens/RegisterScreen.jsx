import { View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Pressable, Keyboard } from 'react-native';
import { colors } from '../../theme.js';
import { useForm, Controller } from 'react-hook-form';
import { useState, useRef } from 'react';
import EyeIcon from '../components/EyeIcon.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function RegisterScreen({ navigation }) {
  const { control, reset, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);
  const submitButtonRef = useRef(null);

  const scrollToInput = (event) => {
    const input = event.target;

    input.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current?.scrollTo({
          y: y + 200,
          animated: true
        });
      },
      () => console.log('Could not measure input')
    );

  };

  // const returnToTop = () => {
  //   Keyboard.dismiss();

  //   scrollViewRef.current?.scrollTo({
  //     y: 0,
  //     animated: true
  //   });
  // };

  const submitHandler = (data) => {
    Keyboard.dismiss();
    console.log(data);

    reset();

  };

  const switchPasswordVisibility = (field) => {

    setIsPasswordVisible(state => ({
      ...state,
      [field]: isPasswordVisible[field] ? false : true
    }))
  }



  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView behavior='padding' contentContainerStyle={{ flex: 1 }}>

        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 65 }]} keyboardShouldPersistTaps="handled" ref={scrollViewRef}>

          <View style={{ alignItems: 'center', marginBottom: 34 }}>
            <Text style={{ fontSize: 80, color: colors.primary }}>&#128214;</Text>
            <Text style={{ fontSize: 23, fontWeight: '900', color: colors.text }}>My BookShelf</Text>
          </View>

          <Text style={styles.heading}>Create Account</Text>

          {/* <Text style={styles.subheading}>Start building your personal library</Text> */}

          <View onFocus={scrollToInput} >


            <Text style={styles.label}>Email address</Text>

            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor={colors.muted}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(submitHandler)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                // onFocus={scrollToInput}
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
                },
                maxLength: {
                  value: 20,
                  message: 'Password should be no more then 20 characters long!'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message: 'Password must contain at least one uppercase letter and one special character!'
                },
              }}
              render={({ field: { onBlur, onChange, value } }) => (
                <View style={styles.inputContainer}>

                  <TextInput
                    style={styles.input}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(submitHandler)}
                    placeholder="Create a password"
                    placeholderTextColor={colors.muted}
                    secureTextEntry={!isPasswordVisible['password']}
                  // onFocus={scrollToInput}
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

            <Text style={styles.label}>Confirm password</Text>

            <Controller
              control={control}
              name='confirmPassword'
              rules={{
                required: 'Confirm password is required!',
                validate: value => value === getValues('password') || "Passwords don't match!"
              }}
              render={({ field: { onBlur, onChange, value } }) => (
                <View style={styles.inputContainer}>

                  <TextInput
                    style={styles.input}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(submitHandler)}
                    placeholder="Repeat your password"
                    placeholderTextColor={colors.muted}
                    secureTextEntry={!isPasswordVisible['confirmPassword']}
                  // onFocus={scrollToInput}
                  />

                  <Pressable
                    onPress={() => switchPasswordVisibility('confirmPassword')}
                    style={styles.eyeIcon}
                  >
                    <EyeIcon isVisible={isPasswordVisible['confirmPassword']} />
                  </Pressable>
                </View>
              )}
            />

            {errors.confirmPassword &&
              <Text style={styles.error}>{errors.confirmPassword.message}</Text>
            }

            <Pressable style={styles.button} onPress={handleSubmit(submitHandler)}>
              <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>

            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 3 }}>
            <Text style={{ textAlign: 'center', color: colors.muted, marginTop: 28, fontSize: 13 }}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Login</Text>
            </Pressable>
            </View> */}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}


export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',

  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingLeft: 22,
    paddingRight: 22,
  },
  heading: {
    color: colors.text,
    fontSize: 27,
    fontWeight: 800,
    marginBottom: 15
  },
  subheading: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 26,
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
