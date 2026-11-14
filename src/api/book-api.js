import { Alert } from "react-native";
import api from "./api.js";

export async function createBook(bookData){

    try {
        const response = await api.post('/books', bookData)

        return response;
    } catch (err) {
        throw new Error('Book cannot be created. Please try again later!')
     
    }
}

export async function getAllBooks() {
     try {
        const response = await api.get('/books')

        return response.data;
    } catch (err) {
        throw new Error('Books cannot be retrived from server. Please try again later!')
       
    }
}

export async function getLastFourBooks() {
     try {
        const response = await api.get('/books?limit=4')

        return response.data;
    } catch (err) {
        throw new Error('Books cannot be retrived from server. Please try again later!')
       
    }
}

export async function getBookById(bookId) {
     try {
        const response = await api.get(`/books?id=eq.${bookId}`)
console.log('bookApi',response.data);

        return response.data;
    } catch (err) {
        throw new Error('This Book cannot be retrive.Please try again later!')
    
    }
}