import { View, Text, TextInput, ScrollView, Image, StyleSheet, Pressable, KeyboardAvoidingView, Alert, Button, RefreshControl } from 'react-native';
import { colors } from '../../theme.js';
import { CountryPicker } from 'react-native-country-picker-modal';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react';
import { uuid } from 'expo';
import { userApi } from '../api';
import { useAuthContext } from '../contexts/auth/AuthContext.js';
import { File } from 'expo-file-system';


export default function EditProfileScreen({ navigation, route }) {
    const [imageUri, setImageUri] = useState(null);
    const [photo, setPhoto] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuthContext()
    const userInfo = route.params;

    const { control, handleSubmit, setValues, formState: { isSubmitting } } = useForm({
        defaultValues: {
            fullName: '',
            username: '',
            age: '',
            gender: '',
            country: {
                cca2: '',
                name: ''
            },
            imageUrl: ''
        }
    });

    const userData = {
        fullName: userInfo.fullName,
        username: userInfo.username,
        age: userInfo.age,
        country: {
            cca2: userInfo.country_cca2,
            name: userInfo.country_name
        },
        gender: userInfo.gender,
        imageUrl: photo,
    }

    useEffect(() => {
        setRefreshing(true)
        setValues(userData)
        setRefreshing(false)
    }, []);


    const pickImage = async () => {
        const permisionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permisionResult.granted) {
            return (
                <View>
                    <Text>In order to use the camera you need to grant camera permission!</Text>
                    <Button title='Grant Camera Permission' onPress={permisionResult} />
                </View>
            )
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            ediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri)
        }

    }

    const takePhoto = async () => {
        const permisionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permisionResult.granted) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            ediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.canceled) {
            setImageUri(result.assets[0].uri)
        }
    }

    const submitHandler = async (data) => {
        let imageUrl = userInfo.imageUrl;

        if (imageUri) {
            try {
                const file = new File(imageUri)
                const arrayBuffer = await file.arrayBuffer()

                const fileName = `${uuid.v4()}.jpg`
                await userApi.uploadImage(fileName, arrayBuffer);

                imageUrl = `https://jekwxfohagnknpkqdgdo.supabase.co/storage/v1/object/public/avatars/${fileName}`;


                setPhoto(imageUrl);

            } catch (err) {
                Alert.alert(err.message)
            }
        }


        const userInputInfo = {
            fullName: data.fullName,
            username: data.username,
            gender: data.gender,
            age: data.age,
            country_name: data.country.name,
            country_cca2: data.country.cca2,
            imageUrl,
        }

        try {

            await userApi.updateUserInfo(user.id, userInputInfo)

            navigation.goBack();

        } catch (err) {
            Alert.alert(err.message)
        }
    };

    const refreshHandler = async () => {
        setValues(userData)
    }

    const image = imageUri
        ? imageUri
        : userInfo.imageUrl !== ''
            ? userInfo.imageUrl
            : null;

    return (
        <KeyboardAvoidingView style={styles.screen} behavior='padding'>
            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
            // showsVerticalScrollIndicator={false}
            >


                {/* Profile Image */}
                <View style={styles.imageContainer}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{
                                uri: image
                            }}
                            style={styles.profileImage}
                        />
                    </View>

                    <Pressable style={styles.cameraButton} onPress={takePhoto}>
                        <Text style={styles.cameraIcon}>📷</Text>
                    </Pressable>

                </View>
                <View style={{ marginTop: 20 }}>
                    <Pressable onPress={pickImage}>
                        <Text >Upload from gallery</Text>
                    </Pressable>
                </View>


                <View style={[styles.field, styles.disabledField]}>
                    <Text style={styles.fieldIcon}>✉</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={user.email}
                            editable={false}
                        />
                    </View>

                    <Text style={styles.lockIcon}>🔒</Text>
                </View>


                <View style={styles.field}>
                    <Text style={styles.fieldIcon}>♟</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <Controller
                            control={control}
                            name='fullName'
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    style={styles.input}
                                    placeholder='Full Name'
                                    keyboardType="default"
                                />
                            )}
                        />

                    </View>
                </View>

                <View style={styles.field}>
                    <Text style={styles.fieldIcon}>♟</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <Controller
                            control={control}
                            name='username'
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    style={styles.input}
                                    placeholder='Username'
                                    keyboardType="default"
                                />
                            )}
                        />

                    </View>
                </View>


                <View style={styles.field}>
                    <Text style={styles.fieldIcon}>▦</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Age</Text>
                        <Controller
                            control={control}
                            name='age'
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    style={styles.input}
                                    placeholder="Enter your age"
                                    keyboardType="numeric"
                                />

                            )}
                        />
                    </View>
                </View>


                <Controller
                    control={control}
                    name='country'
                    render={({ field: { value, onChange } }) => (

                        <View style={styles.field} >
                            <Text style={styles.fieldIcon}>◎</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Country</Text>
                                <Text style={styles.input}>{value.name}</Text>
                            </View>

                            <CountryPicker
                                countryCode={value.cca2}
                                withFilter
                                withFlag
                                onSelect={(selectedCountry) => {
                                    onChange({
                                        cca2: selectedCountry.cca2,
                                        name: selectedCountry.name
                                    })

                                }}

                            />
                            <Text style={styles.arrow}>⌄</Text>
                        </View>
                    )}
                />



                <View style={styles.genderField}>
                    <Text style={styles.fieldIcon}>⚥</Text>

                    <View style={styles.genderContainer}>
                        <Text style={styles.genderLabel}>Gender</Text>


                        <View style={styles.genderOptions}>
                            <Controller
                                control={control}
                                name='gender'
                                render={({ field: { value, onChange } }) => (
                                    <View style={styles.radioOption}>
                                        <Text style={styles.radioText}>Male</Text>
                                        <Pressable
                                            name='male'
                                            style={[styles.radioSelected, { backgroundColor: value === 'male' ? colors.primary : '#ECEBF5', }]}
                                            value={value}
                                            onPress={() => onChange('male')}
                                        >
                                        </Pressable>

                                        <Text style={styles.radioText}>female</Text>
                                        <Pressable
                                            name='female'
                                            style={[styles.radioSelected, { backgroundColor: value === 'female' ? colors.primary : '#ECEBF5', }]}
                                            value={value}
                                            onPress={() => onChange('female')}
                                        >
                                        </Pressable>

                                        <Text style={styles.radioText}>Other</Text>
                                        <Pressable
                                            name='other'
                                            style={[styles.radioSelected, { backgroundColor: value === 'other' ? colors.primary : '#ECEBF5', }]}
                                            value={value}
                                            onPress={() => onChange('other')}
                                        >
                                        </Pressable>
                                    </View>
                                )}
                            />


                        </View>

                    </View>
                </View>


                <Pressable style={styles.button} onPress={handleSubmit(submitHandler)}>
                    <Text style={styles.buttonIcon}>✎</Text>
                    <Text style={styles.buttonText}>{isSubmitting ? 'Updating...' : 'Update Profile'}</Text>
                </Pressable>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        marginBottom: 30
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 35,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    back: {
        fontSize: 35,
        color: colors.text,
        width: 25,
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: '800',
        color: colors.text,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 35,
        marginTop: 20
    },
    imageWrapper: {
        width: 155,
        height: 155,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#5944D6',
        padding: 4,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
    },
    cameraButton: {
        position: 'absolute',
        right: '30%',
        bottom: 0,
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#5944D6',
        borderWidth: 3,
        borderColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        fontSize: 19,
    },
    field: {
        minHeight: 76,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 14,
        backgroundColor: colors.surface,
    },
    disabledField: {
        backgroundColor: '#F0EDF9',
    },
    fieldIcon: {
        width: 42,
        fontSize: 24,
        color: '#5944D6',
        fontWeight: '700',
    },
    inputContainer: {
        flex: 1,
        paddingVertical: 9,
    },
    label: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 3,
        fontWeight: '600',
    },
    input: {
        fontSize: 15,
        color: colors.text,
        padding: 0,
        minHeight: 24,
    },
    lockIcon: {
        fontSize: 17,
        marginLeft: 8,
    },
    arrow: {
        fontSize: 25,
        color: '#5944D6',
        marginLeft: 8,
    },
    genderField: {
        minHeight: 75,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 25,
        backgroundColor: colors.surface,
    },
    genderContainer: {
        flex: 1,
    },
    genderLabel: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 3,
        fontWeight: '600',
        marginBottom: 12,
    },
    genderOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    radioOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 13,
    },
    radioCircle: {
        width: 19,
        height: 19,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.muted,
    },
    radioSelected: {
        width: 19,
        height: 19,
        borderRadius: 10,
        backgroundColor: '#5944D6',
        borderWidth: 4,
        borderColor: '#DCD5FF',
    },
    radioText: {
        fontSize: 12,
        color: colors.text,
        fontWeight: '600',
    },
    button: {
        minHeight: 55,
        borderRadius: 16,
        backgroundColor: '#5944D6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 5,
    },
    buttonIcon: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});
