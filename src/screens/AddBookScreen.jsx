import { View, Text, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Alert, Image, Button, RefreshControl, TouchableOpacity, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import RadioButton from '../components/RadioButton.jsx';
import InputController from '../components/InputController.jsx';
import StarRating from '../components/StarRating.jsx';
import { colors } from '../../theme.js';
import { useEffect, useRef, useState } from 'react';
import { bookApi, userApi } from '../api';
import ActivityItem from '../components/ActivityItem.jsx';
import useImageUrl from '../hooks/useImageUrl.js';
import { File } from 'expo-file-system';
import { uuid } from 'expo'
import * as Haptics from 'expo-haptics';
import Header from '../components/Header.jsx'; 

export default function AddBookScreen({ navigation, route }) {
  const { handleSubmit, control, setValues, reset, clearErrors, formState: { errors, isSubmitting } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
      description: '',
      genre: '',
      status: '',
      rating: 0,
      imageUrl: null
    }
  })
  const { imageUri, setImageUri, imageUrl, setImageUrl, takePhoto, pickImage } = useImageUrl();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefershing] = useState(false);
  const inputPath = route.params?.inputPath;
  const { bookId } = inputPath === 'Edit' && route.params;
  const scrollViewRef = useRef(null);
  const titleInputRef = useRef(null);
  const authorInputRef = useRef(null);
  const descriptionInputRef = useRef(null); 
 
  useEffect(() => {
    if (bookId) {
      bookApi.getBookById(bookId)
        .then(data => {
          setValues(data[0])
          setImageUrl(data[0].imageUrl)
        })
        .catch(err => Alert.alert(err.message))
    }
  }, [bookId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      clearErrors()
      reset();
      setImageUri(null)
    });

    return unsubscribe;
  }, [navigation]);


  const refreshHandler = async () => {
    setRefershing(true);

    try {
      clearErrors();

      if (inputPath === 'Edit') {
        const result = await bookApi.getBookById(bookId);

        setValues(result[0])
        setImageUrl(result[0].imageUrl)
      } else {
        setImageUri(null)
        reset()
      }
    } catch (err) {

      Alert.alert(err.message)
    } finally {
      setRefershing(false)
    }
  }


  const submitHandler = async (data) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    Keyboard.dismiss();

    try {
      setLoading(true);

      let photo = imageUrl;

      if (imageUri) {
        try {
          const file = new File(imageUri)
          const arrayBuffer = await file.arrayBuffer()

          const fileName = `${uuid.v4()}.jpg`
          await userApi.uploadBookImage(fileName, arrayBuffer);

          photo = `https://jekwxfohagnknpkqdgdo.supabase.co/storage/v1/object/public/books/${fileName}`;


          setImageUrl(photo);

        } catch (err) {
          Alert.alert(err.message)
        }
      }

      const bookData = {
        ...data,
        imageUrl: photo
      }

      if (inputPath === 'Edit') {
        await bookApi.updateBook(bookId, bookData);

      } else {

        await bookApi.createBook(bookData);
      }

      navigation.goBack();

      setImageUri(null)
      setImageUrl(null)
      reset()
    } catch (error) {
      Alert.alert(error)
    } finally {
      setLoading(false)
    }

  }


  const handleFirstFocus = () => {
    titleInputRef.current?.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current?.scrollTo({
          y: y,
          animated: true
        });
      },
      // () => console.log('Measurement failed')
    );
  };

  const image = imageUri
    ? imageUri
    : imageUrl
      ? imageUrl
      : null;

 

  return (
    <View style={[styles.screen, { paddingBottom: inputPath === 'Edit' && 40 }]}>
      <KeyboardAvoidingView behavior='padding'>
        <Header screenName={inputPath === 'Edit' ? 'Edit Book' : 'Add Book'} />
        {loading
          ? <ActivityItem />
          :
          <View onFocus={handleFirstFocus}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
            >

              <View style={styles.imageContainer}>

                {image ?
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{
                        uri: image
                      }}
                      style={styles.profileImage}
                    />
                  </View>
                  : <Text style={styles.cameraButton}>📷</Text>
                }

              </View>
              <View style={{ marginTop: 10, alignItems: 'center', paddingBottom: 15, flexDirection: 'row', gap: 10 }}>

                <TouchableOpacity activeOpacity={0.8} style={styles.imagePickerBtn} onPress={takePhoto}>
                  <Text>📷</Text>
                  <Text style={{ color: 'white', fontSize: 10 }} >Take a photo</Text>
                </TouchableOpacity>
                {/* 
          </View>
          <View style={{  alignItems: 'center'  }}> */}

                <TouchableOpacity activeOpacity={0.8} style={styles.imagePickerBtn} onPress={pickImage}>
                  <Text>🖼️</Text>
                  <Text style={{ color: 'white', fontSize: 10 }} >Gallery</Text>
                </TouchableOpacity>

              </View>


              <Text style={styles.label}>Title</Text>
              <InputController
                ref={titleInputRef}
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
                handleSubmit={() => authorInputRef.current?.focus()}
              />

              {errors.title &&
                <Text style={styles.error}>{errors.title.message}</Text>
              }


              <Text style={styles.label}>Author</Text>
              <InputController
                ref={authorInputRef}
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
                handleSubmit={() => descriptionInputRef.current?.focus()}
              />

              {errors.author &&
                <Text style={styles.error}>{errors.author.message}</Text>
              }


              <Text style={styles.label}>Description</Text>
              <InputController
                ref={descriptionInputRef}
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
                handleSubmit={() => Keyboard.dismiss()}
              />

              {errors.description &&
                <Text style={styles.error}>{errors.description.message}</Text>
              }

              <View>
                <Text style={styles.label}>Genre</Text>
                <Controller
                  control={control}
                  name='genre'
                  rules={{
                    required: 'Genre is required!'
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View>

                      <Picker
                        style={styles.input}
                        onValueChange={onChange}
                        selectedValue={value}
                        submitBehavior="submit"
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
                    </View>

                  )}
                />


                {errors.genre &&
                  <Text style={styles.error}>{errors.genre.message}</Text>
                }
              </View>


              <Text style={styles.label}>Reading status</Text>

              <Controller
                control={control}
                name='status'
                rules={{
                  required: 'Reading status is required!'
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={{ flexDirection: 'row', gap: 7, marginBottom: 20 }}>
                    <RadioButton
                      label='Want to Read'
                      selected={value === 'want-to-read'}
                      onPress={async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        onChange('want-to-read')
                      }}
                    />

                    <RadioButton
                      label='Reading'
                      selected={value === 'reading'}
                      onPress={async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        onChange('reading')
                      }}
                    />

                    <RadioButton
                      label='Read'
                      selected={value === 'read'}
                      onPress={async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        onChange('read')
                      }}
                    />
                  </View>
                )}
              />

              {errors.status &&
                <Text style={styles.error}>{errors.status.message}</Text>
              }

              <Text style={styles.label}>Your rating</Text>

              <Controller
                control={control}
                name='rating'
                rules={{
                  validate: value => value > 0 || 'Please select a rating!'
                }}
                render={({ field: { value, onChange } }) => (
                  <StarRating
                    onChange={onChange}
                    rating={value}
                  />
                )}
              />

              {errors.rating &&
                <Text style={styles.error}>{errors.rating.message}</Text>
              }

              <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSubmit(submitHandler)} disabled={isSubmitting}>
                <Text style={styles.buttonText}>{inputPath === 'Edit' ? 'Edit' : 'Save'} Book</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        }

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
    // paddingBottom: 36,
    paddingBottom: 300,

  },
  imageContainer: {
    height: 200,
    width: '100%',
    borderRadius: 18,
    backgroundColor: '#ECEBF5',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5944D6',
    padding: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50
  },
  cameraIcon: {
    fontSize: 30,
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
  imagePickerBtn: {
    flexDirection: 'row',
    gap: 10,
    width: '48%',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});