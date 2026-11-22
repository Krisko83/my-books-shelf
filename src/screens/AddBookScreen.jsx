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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
                  <Text style={{ color: 'white', fontSize: 10 }} >{t('takeAPhoto')}</Text>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.8} style={styles.imagePickerBtn} onPress={pickImage}>
                  <Text>🖼️</Text>
                  <Text style={{ color: 'white', fontSize: 10 }} >{t('gallery')}</Text>
                </TouchableOpacity>

              </View>


              <Text style={styles.label}>{t('title')}</Text>
              <InputController
                ref={titleInputRef}
                name='title'
                control={control}
                rules={{
                  required: `${t('titleIsRequired')}!`,
                  minLength: {
                    value: 3,
                    message: `${t('titleShouldAtLeast3charactersLong')}!`
                  },
                  maxLength: {
                    value: 20,
                    message: `${t('titleShouldBeLessThenOrEqualTo20Characterslong')}!`
                  }
                }}
                placeholder={t('title')}
                handleSubmit={() => authorInputRef.current?.focus()}
              />

              {errors.title &&
                <Text style={styles.error}>{errors.title.message}</Text>
              }


              <Text style={styles.label}>{t('author')}</Text>
              <InputController
                ref={authorInputRef}
                name='author'
                control={control}
                rules={{
                  required: `${t('authorNameIsRequired')}!`,
                  minLength: {
                    value: 5,
                    message: `${t('authorNameShouldBeAtLeast5Characterslong')}!`
                  },
                  maxLength: {
                    value: 20,
                    message: `${t('authorNameShouldBeLessThenOrEqualTo20Charactera')}!`
                  }
                }}
                placeholder={t('enterAuthorName')}
                handleSubmit={() => descriptionInputRef.current?.focus()}
              />

              {errors.author &&
                <Text style={styles.error}>{errors.author.message}</Text>
              }


              <Text style={styles.label}>{t('description')}</Text>
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
                placeholder={t('writeAShortDescription')}
                handleSubmit={() => Keyboard.dismiss()}
              />

              {errors.description &&
                <Text style={styles.error}>{errors.description.message}</Text>
              }

              <View>
                <Text style={styles.label}>{t('genre')}</Text>
                <Controller
                  control={control}
                  name='genre'
                  rules={{ 
                    validate: value => value !== '' || `${t('genreIsRequired')}!`
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View>

                      <Picker
                        style={styles.input}
                        onValueChange={onChange}
                        selectedValue={value}
                        submitBehavior="submit"
                      >
                        <Picker.Item label={`${t('chooseGenre')}...`} value='' />
                        <Picker.Item label={`${t('action')}`} value='action' />
                        <Picker.Item label={`${t('comedy')}`} value='comedy' />
                        <Picker.Item label={`${t('drama')}`} value='drama' />
                        <Picker.Item label={`${t('horror')}`} value='horror' />
                        <Picker.Item label={`${t('romance')}`} value='romance' />
                        <Picker.Item label={`${t('fantasy')}`} value='fantasy' />
                        <Picker.Item label={`${t('scienceFiction')}`} value='science-fiction' />
                        <Picker.Item label={`${t('mystery')}`} value='mystery' />
                        <Picker.Item label={`${t('crime')}`} value='crime' />
                        <Picker.Item label={`${t('other')}`} value='other' />
                      </Picker>
                    </View>

                  )}
                />


                {errors.genre &&
                  <Text style={styles.error}>{errors.genre.message}</Text>
                }
              </View>


              <Text style={styles.label}>{t('readingStatus')}</Text>

              <Controller
                control={control}
                name='status'
                rules={{
                  required: 'Reading status is required!'
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={{ flexDirection: 'row', gap: 7, marginBottom: 20 }}>
                    <RadioButton
                      label={t('wantToRead')}
                      selected={value === 'want-to-read'}
                      onPress={async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        onChange('want-to-read')
                      }}
                    />

                    <RadioButton
                      label={t('reading')}
                      selected={value === 'reading'}
                      onPress={async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        onChange('reading')
                      }}
                    />

                    <RadioButton
                      label={t('read')}
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

              <Text style={styles.label}>{t('yourRating')}</Text>

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
                <Text style={styles.buttonText}>{inputPath === 'Edit' ? `${t('edit')}` : `${t('save')}`} {t('book')}</Text>
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