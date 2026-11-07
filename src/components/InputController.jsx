import { Controller } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../../theme.js";

export default function InputController({control, name, rules, placeholder, handleSubmit, capitalize='sentences', keyboardType = 'default'}) {

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.muted}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    onSubmitEditing={handleSubmit}
                    keyboardType={keyboardType}
                    autoCapitalize={capitalize}
                />
            )}
        />
    );
}


const styles = StyleSheet.create({
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


});