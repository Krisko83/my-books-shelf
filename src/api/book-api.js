import { api } from './api.js'

export async function createBook(bookData) {

    try {
        const response = await api.post('/books', bookData)

        return response;
    } catch (err) {
 
        throw new Error('Book cannot be created. Please try again later!')

    }
}

export async function getAllBooks() {
    try {
        const response = await api.get('/books?order=created_at.desc')

        return response.data;
    } catch (err) {
        throw new Error('Books cannot be retrieve from server. Please try again later!')

    }
}

export async function getLastFourBooks() {
    try {
        const response = await api.get('/books?order=created_at.desc&limit=4')

        return response.data;
    } catch (err) {
        throw new Error('Books cannot be retrieve from server. Please try again later!')

    }
}

export async function getBookById(bookId) {
    try {
        const response = await api.get(`/books?id=eq.${bookId}`)

        return response.data;
    } catch (err) {
        throw new Error('This Book cannot be retrieve.Please try again later!')

    }
}

export async function updateBook(bookId, bookData) {
    try {
        const response = await api.patch(`/books?id=eq.${bookId}`, bookData )

        return response.data;
    } catch (err) {
        throw new Error('Failed to update this book.Please try again later!')

    }
}

export async function deleteBook(bookId) {
    try {
        const response = await api.delete(`/books?id=eq.${bookId}`)

        return response.data;
    } catch (err) {
        throw new Error('Failed to delete this book. Please try again later!')

    }
}