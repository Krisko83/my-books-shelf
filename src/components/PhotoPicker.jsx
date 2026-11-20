import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../constants/colors';

export default function PhotoPicker({ onChange }) {
    const [imageUri, setImageUri] = useState(null);

    if (imageUri) {
        return (
            <View style={styles.previewContainer}>
                <Image source={{ uri: imageUri }} style={styles.preview} />

                <View style={styles.previewActions}>
                    <TouchableOpacity
                        style={styles.previewButton}
                        activeOpacity={0.8}
                        onPress={chooseFromGalleryHandler}
                    >
                        <Text style={styles.previewButtonText}>🔄  Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.previewButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.previewButtonText}>🗑️  Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.picker}>
            <Text style={styles.icon}>📷</Text>
            <Text style={styles.title}>Add a photo</Text>
            <Text style={styles.hint}>Take a picture or choose from gallery</Text>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionText}>📸  Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.actionButtonOutline]}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.actionText, styles.actionTextOutline]}>🖼️  Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    picker: {
        borderRadius: 18,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: colors.primary,
        backgroundColor: colors.accentSoft,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 22,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    icon: {
        fontSize: 40,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
    },
    hint: {
        fontSize: 13,
        color: colors.textMuted,
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 16,
    },
    actionButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    actionButtonOutline: {
        backgroundColor: colors.surface,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
    },
    actionTextOutline: {
        color: colors.primary,
    },
    previewContainer: {
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: colors.surface,
    },
    preview: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    previewActions: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        flexDirection: 'row',
        gap: 8,
    },
    previewButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        borderRadius: 16,
        paddingVertical: 7,
        paddingHorizontal: 12,
    },
    previewButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.white,
    },
});
