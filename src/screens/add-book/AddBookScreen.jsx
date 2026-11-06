import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView } from 'react-native';
import { colors } from '../../../theme.js';
import { useForm, Controller } from 'react-hook-form';
import InputController from '../../components/input-controller/InputController.jsx';
import { Picker } from '@react-native-picker/picker';

export default function AddBookScreen() {
  const { handleSubmit, getValues, control, reset, formState: { errors, isSubmitting } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
      description: '',
      genre: ''
    }
  })

  const submitHandler = (data) => {
    console.log(data);

    console.log('Submit');
    reset()
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView behavior='padding'>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

          <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 25 }}>Add Book</Text>

          <View style={{ height: 125, width: 125, borderRadius: 18, backgroundColor: '#ECEBF5', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
            <Text style={{ fontSize: 32, color: colors.primary }}>▧</Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 6 }}>Add Cover</Text>
          </View>


          <Text style={styles.label}>Title *</Text>
          <InputController
            name='title'
            control={control}
            rules={{
              required: 'Title is required!',
              minLength: {
                value: 3,
                message: 'Title should at least 3 characters long!'
              },
              maxLength: {
                value: 20,
                message: 'Title should be less then or equal to 20 characters long!'
              }
            }}
            placeholder="Title"
            handleSubmit={handleSubmit(submitHandler)}
          />

          {errors.title &&
            <Text style={styles.error}>{errors.title.message}</Text>
          }


          <Text style={styles.label}>Author *</Text>
          <InputController
            name='author'
            control={control}
            rules={{
              required: 'Author name is required!',
              minLength: {
                value: 5,
                message: 'Author name should be at least 5 characters long!'
              },
              maxLength: {
                value: 20,
                message: 'Author name should be less then or equal to 20 charactera!'
              }
            }}
            placeholder='Enter author name'
            handleSubmit={handleSubmit(submitHandler)}
          />

          {errors.author &&
            <Text style={styles.error}>{errors.author.message}</Text>
          }


          <Text style={styles.label}>Description *</Text>
          <InputController
            control={control}
            name='description'
            rules={{
              required: 'Description is required!',
              minLength: {
                value: 10,
                message: 'Description should be at least 10 characters long!'
              },
              maxLength: {
                value: 50,
                message: 'Description should be no more then 50 characters long!'
              }
            }}
            placeholder='Write a short description'
            handleSubmit={handleSubmit(submitHandler)}
          />

          {errors.description &&
            <Text style={styles.error}>{errors.description.message}</Text>
          }


          <Text style={styles.label}>Genre</Text>
          <Controller
            control={control}
            name='genre'
            rules={{
              required: 'Genre is required!'
            }}
            render={({ field: { onChange, value } }) => (
              <Picker
                style={styles.input}
                onValueChange={onChange}
                selectedValue={value}
              >
                <Picker.Item label='Choose genre...' value='' />
                <Picker.Item label='Action' value='action' />
                <Picker.Item label='Comedy' value='comedy' />
                <Picker.Item label='Drama' value='drama' />
                <Picker.Item label='Horror' value='horror' />
                <Picker.Item label='Romance' value='romance' />
                <Picker.Item label='Fantasy' value='fantasy' />
                <Picker.Item label='Science Fiction' value='science-fiction' />
                <Picker.Item label='Mystery' value='mystery' />
                <Picker.Item label='Crime' value='crime' />
                <Picker.Item label='Other' value='other' />
              </Picker>
            )}
          />
 

          <Text style={styles.label}>Reading status</Text>

          <View style={{ flexDirection: 'row', gap: 7, marginBottom: 20 }}>
            {['Want to Read', 'Reading', 'Read'].map((x, i) => <View key={x} style={{ flex: 1, paddingVertical: 12, borderRadius: 11, backgroundColor: i === 1 ? colors.primary : '#ECEBF5', alignItems: 'center' }}><Text style={{ color: i === 1 ? '#FFF' : colors.muted, fontSize: 10, fontWeight: '700' }}>{x}</Text></View>)}
          </View>

          <Text style={styles.label}>Your rating</Text>

          <Text style={{ color: colors.gold, fontSize: 29, marginBottom: 22 }}>★ ★ ★ ☆ ☆</Text>

          <Pressable style={styles.button} onPress={handleSubmit(submitHandler)}>
            <Text style={styles.buttonText}>Save Book</Text>
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
    width: '100%'
  },
  content: {
    padding: 22,
    paddingBottom: 36,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8
  },
  input: {
    minHeight: 50,
    justifyContent: 'center',
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
});