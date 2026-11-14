import { Link } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BookItem from "../components/BookItem.jsx";
import { useEffect, useState } from "react";
import { bookApi } from "../api/index.js";
import { set } from "react-hook-form";

export default function MyBookScreen({ route }) {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookApi.getAllBooks()
            .then(setBooks)
            .catch(err => Alert.alert(err))
    }, []);


    return (
        <View style={{ paddingBottom: route.name === 'MainMyBooks' && 50 }} >
            {books.length > 0 ?
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    vertical
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Link screen='Details' params={{ bookId: item.id }}>
                                <BookItem {...item} />
                            </Link>
                        </View>
                    )}
                />
                :
                <Text>Your Library is Empty!</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: 'white',
        elevation: 15,

    }
})