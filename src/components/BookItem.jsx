import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme.js"


export default function BookItem({
    title,
    author,
    status,
    imageUrl
}) {

    return (
        <View style={styles.card} >
            <Image source={{ uri: imageUrl }} style={styles.image} />

            <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '800', fontSize: 8, marginTop: 10 , overflow: 'hidden'}}>{title}</Text>
            <Text style={{ color: colors.muted, fontSize: 8, marginTop: 3 }}>{author}</Text>
            <View style={{ alignSelf: 'flex-start', backgroundColor: status === 'Want to Read' ? colors.softPurple : colors.green, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, marginTop: 9 }}>
                <Text style={{ color: status === 'Want to Read' ? colors.primary : colors.greenText, fontSize: 10, fontWeight: '700' }}>{status}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120 
    },
    card: {
        gap: 5,
        padding: 15
    }
}
)