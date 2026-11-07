import { Link } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BookItem from "../components/BookItem.jsx";

export const books = [
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 1, title: 'Atomic Habits', author: 'James Clear', status: 'Reading', genre: 'action', cover: '#E8D6B2', ink: '#765B39', mark: 'A', description: 'Some description here', rating: 3 },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 2, title: 'Dune', author: 'Frank Herbert', status: 'Read', genre: 'action', cover: '#D88C48', ink: '#35251D', mark: 'D', description: 'Some description here', rating: 3 },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 3, title: 'The Midnight Library', author: 'Matt Haig', genre: 'action', status: 'Want to Read', cover: '#27435C', ink: '#FFFFFF', mark: '✦', description: 'Some description here', rating: 4 },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 4, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'action', status: 'Read', cover: '#D5B84A', ink: '#342B16', mark: 'P', description: 'Some description here', rating: 3 },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 5, title: 'Atomic Habits', author: 'James Clear', status: 'Reading', genre: 'action', cover: '#E8D6B2', ink: '#765B39', mark: 'A', description: 'Some description here', rating: 5 },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 6, title: 'Dune', author: 'Frank Herbert', status: 'Read', genre: 'action', cover: '#D88C48', ink: '#35251D', mark: 'D', description: 'Some description here', rating: 3 },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 7, title: 'The Midnight Library', author: 'Matt Haig', genre: 'action', status: 'Want to Read', cover: '#27435C', ink: '#FFFFFF', mark: '✦', description: 'Some description here', rating: 2 },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvaDsMEloTWdi1UzXzrlsL5BUTUq2eHfZGipoSf3dReBFhMQkMFeIc0k&s=10://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', id: 8, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'action', status: 'Read', cover: '#D5B84A', ink: '#342B16', mark: 'P', description: 'Some description here', rating: 3 },
];

 

export default function MyBookScreen() {

    return (
        <View  >
            {books.length > 0 ?
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    vertical
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Link screen='Details' params={item.id}>
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