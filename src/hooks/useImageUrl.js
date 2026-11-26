import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { Alert, Linking } from "react-native";
import { useTranslation } from "react-i18next";

export default function useImageUrl() {
    const [imageUri, setImageUri] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const { t } = useTranslation();


    const pickImage = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        const pickImagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!pickImagePermission.granted && pickImagePermission.canAskAgain) {
            Alert.alert(`${t('notification')}`, `${t('inOrderToOpenYourGalleryYouNeedToAllowAccessToYourGallery')}!`, [
                {
                    text: `${t('allow')} `,
                    onPress: async () => await pickImage()
                },
                {
                    text: ` ${t('cancel')}`
                }
            ])
            return
        }

        if (!pickImagePermission.canAskAgain) {

            Alert.alert(`${t('notification')}`, `${t('inOrderToOpenYourGalleryYouNeedToAllowAccessPermissionToYourGalleryInPhoneSettingsMenu')}!`, [
                {
                    text: `${t('goToSettings')}`,
                    onPress: () => Linking.openSettings()
                },
                {
                    text: ` ${t('cancel')}`
                }
            ])
            return
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
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        const takePhotoPermision = await ImagePicker.requestCameraPermissionsAsync();

        if (!takePhotoPermision.granted && takePhotoPermision.canAskAgain) {
            Alert.alert(`${t('notification')}`, `${t('inOrderToTakeAictureYouNeedToAllowAccessToYourCamera')}!`, [
                {
                    text: `${t('allow')} `,
                    onPress: async () => takePhoto()
                },
                {
                    text: ` ${t('cancel')}`
                }
            ])
            return
        }

        if (!takePhotoPermision.canAskAgain) {

            Alert.alert(`${t('notification')}`, `${t('inOrderToTakeAPictureYouNeedToAllowAccessPermissionToYourCameraInPhoneSettingsMenu')}!`, [
                {
                    text: `${t('goToSettings')}`,
                    onPress: () => Linking.openSettings()
                },
                {
                    text: ` ${t('cancel')}`
                }
            ])
            return
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

    return { imageUri, setImageUri, imageUrl, setImageUrl, takePhoto, pickImage }
}
