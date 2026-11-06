import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../../theme.js";

export default function RadioButton({ label, onPress, selected }) {

    return (
        <Pressable onPress={onPress} style={[styles.btn, { backgroundColor: selected ? colors.primary : '#ECEBF5', }]}>
            <Text style={[styles.btnText, { color: selected ? '#fff' : colors.muted }]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 11,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 10,
        fontWeight: '700'
    }
}

)