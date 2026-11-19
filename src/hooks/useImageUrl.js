import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export default function useImageUrl() {
    const [imageUri, setImageUri] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

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

    return { imageUri, setImageUri, imageUrl, setImageUrl, takePhoto, pickImage }
}
