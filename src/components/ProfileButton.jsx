import { Link } from "@react-navigation/native";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../theme.js";

export default function ProfileButton({ icon, name, onPress }) {

    return (
        <Pressable style={styles.button} onPress={onPress} >
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.arrow}>›</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { minHeight: 55, flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1 },
    icon: { color: colors.primary, fontSize: 19, width: 36, },
    text: { color: colors.text, fontSize: 14, fontWeight: '600', flex: 1 },
    arrow: { color: colors.muted, fontSize: 22, }
})