import { getErrorMessage } from '../utils/error.utils.js';
import { api } from './api.js'

export async function createBook(bookData) {

    try {
        const response = await api.post('/books', bookData)

        return response;
    } catch (err) {

        throw new Error(getErrorMessage(err))

    }
}

export async function getAllBooks(user_id) {
    try {
        const response = await api.get(`/books?user_id=eq.${user_id}&order=created_at.desc`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}

export async function getLastFourBooks(user_id) {
    try {
        const response = await api.get(`/books?user_id=eq.${user_id}&order=created_at.desc&limit=5`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}

export async function getBookById(bookId) {
    try {
        const response = await api.get(`/books?id=eq.${bookId}`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}

export async function updateBook(bookId, bookData) {
    try {
        const response = await api.patch(`/books?id=eq.${bookId}`, bookData)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}

export async function deleteBook(bookId) {
    try {
        const response = await api.delete(`/books?id=eq.${bookId}`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}

export async function searchBook(user_id, word) {
    try {
        const response = await api.get(`/books?user_id=eq.${user_id}&or=(title.ilike.*${word}*,author.ilike.*${word}*,genre.ilike.*${word}*)&order=created_at.desc`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}

export async function sortBooks(user_id, sortStatus) {
    try {
        const response = await api.get(`/books?user_id=eq.${user_id}&status=ilike.${sortStatus}&order=created_at.desc`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}


export async function getAllUsersBooks(user_id) {
    try {
        const response = await api.get(`/books?user_id=neq.${user_id}&order=created_at.desc`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}

export async function searchUsersBook(user_id, word, sortBy) {
    let order = 'desc';

    if (sortBy === 'author') {
        order = 'asc'
    }

    try {
        const response = await api.get(`/books?user_id=neq.${user_id}&or=(title.ilike.*${word}*,author.ilike.*${word}*,genre.ilike.*${word}*)${sortBy !== '' ? `&order=${sortBy}.${order}` : null}`)

        return response.data;
    } catch (err) {
        throw new Error(getErrorMessage(err))

    }
}


