import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../theme.js";

export default function RadioButton({ label, onPress, selected, onPressOut }) {

    return (
        <Pressable onPress={onPress} onPressOut={onPressOut} style={[styles.btn, { backgroundColor: selected ? colors.primary : '#ECEBF5', }]}>
            <Text style={[styles.btnText, { color: selected ? '#fff' : colors.muted }]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 11,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 9,
        fontWeight: '700'
    }
}

)