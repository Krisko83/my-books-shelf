import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme.js";

const statusMap = {
    'want-to-read': 'Want to Read',
    'read': 'Read',
    'reading': 'Reading'
}


export default function BookItem({
    inputPath,
    title,
    author,
    status,
    imageUrl,
    rating
}) {

    const stars = '⭐'.repeat(rating);


    return (
        <View style={styles.card} >
            <Image source={{ uri: imageUrl }} style={styles.image} />

            <Text style={{ fontSize: inputPath === 'myBooks' ? 14 : 10 }}>{stars}</Text>

            <Text numberOfLines={1} style={[styles.title, { fontSize: inputPath === 'myBooks' ? 16 : 9 }]}>{title}</Text>


            <Text style={styles.author}>{author}</Text>
            <View style={[styles.statusCtn, { backgroundColor: statusMap[status] === 'Want to Read' ? colors.softPurple : colors.green }]}>
                <Text style={[styles.status, { color: statusMap[status] === 'Want to Read' ? colors.primary : colors.greenText }]}>{statusMap[status]}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 160
    },
    card: {
        gap: 5,
        padding: 15,
        width: '100%'
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
        fontWeight: '700'
    },
    titleStarsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

)

