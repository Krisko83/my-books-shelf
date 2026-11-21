import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../theme.js";

export default function RadioButton({ label, onPress, selected}) {

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.btn, { backgroundColor: selected ? colors.primary : '#ECEBF5', }]}>
            <Text style={[styles.btnText, { color: selected ? '#fff' : colors.muted }]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal:10,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 9,
        fontWeight: '700'
    }
}

)