import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme.js";


export default function BookItem({
    title,
    author,
    status,
    imageUrl
}) {

    return (
        <View style={styles.card} >
            <Image source={{ uri: imageUrl }} style={styles.image} />

            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
            <View style={[styles.statusCtn, { backgroundColor: status === 'Want to Read' ? colors.softPurple : colors.green }]}>
                <Text style={[styles.status, { color: status === 'Want to Read' ? colors.primary : colors.greenText}]}>{status}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 150
    },
    card: {
        gap: 5,
        padding: 15
    },
    statusCtn: {
        alignSelf: 'flex-start',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 12,
        marginTop: 9
    },
    author: {
        color: colors.muted,
        fontSize: 8,
        marginTop: 3
    },
    title: {
        color: colors.text,
        fontWeight: '800',
        fontSize: 8,
        marginTop: 10,
        overflow: 'hidden'
    },
    status: {
        fontSize: 10, 
        fontWeight: '700' }
}
)

