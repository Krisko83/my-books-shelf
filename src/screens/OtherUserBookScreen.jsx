import { useFocusEffect } from "@react-navigation/native";
import { Alert, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BookItem from "../components/BookItem.jsx";
import { use, useCallback, useEffect, useState } from "react";
import { bookApi } from "../api/index.js";
import { Controller, set, useForm } from "react-hook-form";
import { colors } from "../../theme.js";
import RadioButton from "../components/RadioButton.jsx";
import ActivityItem from "../components/ActivityItem.jsx";
import * as Haptics from 'expo-haptics';
import Header from "../components/Header.jsx";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/auth/AuthContext.js";

export default function OtherUserBookScreen({ navigation, route }) {
    const { getValues, control, reset, setValue, handleSubmit } = useForm({
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
    const { t } = useTranslation();
    const inputPath = route.name;
    const { user } = use(AuthContext);
    const [isSearched, setIsSearched] = useState(false);


    useFocusEffect(
        useCallback(() => {
            const getMybook = async () => {
                reset()
                try {
                    setLoading(true)
                    const allBooks = await bookApi.getAllBooks()

                    setBooks(allBooks)
                } catch (err) {
                    Alert.alert(err.message)
                } finally {
                    setLoading(false)
                }
            }

            getMybook()
        }, [])
    )


    const pressHandler = async (bookId) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        navigation.navigate('Details', { bookId })
    }

    const refreshHandler = async () => {
        setRefreshing(true);
        reset();

        try {
            const data = await bookApi.getAllBooks()
            setBooks(data)
        } catch (err) {
            Alert.alert(err)
        } finally {
            setRefreshing(false)
        }
    }

    const submitSortHandler = async (data) => {
        const sortStatus = data.sort;

        if(getValues().sort === 'all') {
            return refreshHandler()
        }

        if (getValues().search !== '') {
            setValue('search', '')
        }
        try {
            setIsSearched(true)
            const data = await bookApi.sortBooks(user.id, sortStatus);

            setBooks(data)
        } catch (err) {
            Alert.alert(err.message)
        }

    }

    const submitSearchHandler = async (data) => {
        const searchWord = data.search;

        if (getValues().sort !== '') {
            setValue('sort', 'all')
        }
        try {
            setIsSearched(true)
            const data = await bookApi.searchBook(user.id, searchWord)

            setBooks(data)
        } catch (err) {
            Alert.alert(err.message)
        }

    }

    return (
        <>
            <Header screenName={t('myLibrary')} />
            {loading ?
                <ActivityItem />
                :
                <View style={{ marginBottom: 128, paddingBottom: 150 }} >

                    <View style={{ paddingHorizontal: 15 }} >
                        <Controller
                            control={control}
                            name='search'
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, { marginTop: 18, marginBottom: 15 }]}
                                    placeholder={`⌕ ${t('searchBooks')}...`}
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
                                        label={t('all')}
                                        selected={value === 'all'}
                                        onPress={async () => {
                                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                            onChange('all')
                                            submitSortHandler({ sort: 'all' })
                                        }}
                                    />

                                    <RadioButton
                                        label={t('reading')}
                                        selected={value === 'reading'}
                                        onPress={async () => {
                                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                            onChange('reading')
                                            submitSortHandler({ sort: 'reading' })
                                        }}
                                    />

                                    <RadioButton
                                        label={t('wantToRead')}
                                        selected={value === 'want-to-read'}
                                        onPress={async () => {
                                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                            onChange('want-to-read')
                                            submitSortHandler({ sort: 'want-to-read' })
                                        }}
                                    />

                                    <RadioButton
                                        label={t('read')}
                                        selected={value === 'read'}
                                        onPress={async () => {
                                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                            onChange('read')
                                            submitSortHandler({ sort: 'read' })
                                        }}
                                    />
                                </View>
                            )}
                        />

                    </View>

                    {books.length > 0
                        ?
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
                                        <BookItem {...item} inputPath='myBooks' />
                                    </Pressable>

                                </View>
                            )}
                        />

                        :
                        <ScrollView
                            contentContainerStyle={{ height: 300, justifyContent: 'center', alignItems: 'center' }}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{isSearched ? 'No results found!' : 'Your Library is Empty!'}</Text>
                        </ScrollView>
                    }

                </View>
            }
        </>

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