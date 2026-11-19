import { Link } from "@react-navigation/native";
import { Alert, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BookItem from "../components/BookItem.jsx";
import { useEffect, useState } from "react";
import { bookApi } from "../api/index.js";
import { Controller, set, useForm } from "react-hook-form";
import { colors } from "../../theme.js";
import RadioButton from "../components/RadioButton.jsx";
import ActivityItem from "../components/ActivityItem.jsx";
import * as Haptics from 'expo-haptics';

export default function MyBookScreen({ navigation, route }) {
    const { control, handleSubmit } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            search: '',
            sort: 'all'
        }
    });
    const [books, setBooks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputPath = route.name;

    useEffect(() => {
        setLoading(true)

        bookApi.getAllBooks()
            .then(setBooks)
            .catch(err => Alert.alert(err))
            .finally(() => setLoading(false))

    }, []);

    if (loading) {
        return <ActivityItem />
    }

    const pressHandler = async (bookId) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

        navigation.navigate('Details', { bookId })
    }

    const refreshHandler = async () => {
        setRefreshing(true);

        try {
            const data = await bookApi.getAllBooks()
            setBooks(data)
        } catch (err) {
            Alert.alert(err)
        } finally {
            setRefreshing(false)
        }
    }

    const submitSortHandler = (data) => {
        console.log(data.sort);

    }

    const submitSearchHandler = (data) => {
        console.log(data.search);

    }

    return (

        <View style={{ marginBottom: 128 }} >
            <View style={{ paddingHorizontal: 15 }} >
                <Controller
                    control={control}
                    name='search'
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, { marginTop: 18, marginBottom: 15 }]}
                            placeholder="⌕  Search books..."
                            placeholderTextColor={colors.muted}
                            onSubmitEditing={handleSubmit(submitSearchHandler)}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />


                <Controller
                    control={control}
                    name='sort'
                    render={({ field: { onChange, value } }) => (
                        <View style={{ flexDirection: 'row', gap: 5, marginBottom: 10 }}>
                            <RadioButton
                                label='All'
                                selected={value === 'all'}
                                onPress={ async () => {
                                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                    onChange('all')
                                    submitSortHandler({ sort: 'all' })
                                }}
                            />

                            <RadioButton
                                label='Reading'
                                selected={value === 'reading'}
                                onPress={ async () => {
                                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                    onChange('reading')
                                    submitSortHandler({ sort: 'reading' })
                                }}
                            />

                            <RadioButton
                                label='Want to Read'
                                selected={value === 'want-to-read'}
                                onPress={ async () => {
                                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                    onChange('want-to-read')
                                    submitSortHandler({ sort: 'want-to-read' })
                                }}
                            />

                            <RadioButton
                                label='Read'
                                selected={value === 'read'}
                                onPress={ async () => {
                                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                    onChange('read')
                                    submitSortHandler({ sort: 'read' })
                                }}
                            />
                        </View>
                    )}
                />

            </View>

            {books.length > 0 ?
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                    contentContainerStyle={{ paddingBottom: inputPath === 'MainMyBooks' ? 65 : 15 }}
                    vertical
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
                    renderItem={({ item }) => (

                        < View style={styles.container}>

                            <Pressable onPress={() => pressHandler(item.id)} screen='Details' >
                                <BookItem {...item} />
                            </Pressable>

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
        marginTop: 15,
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: 'white',
        elevation: 15,
        width: '85%'
    },
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
})