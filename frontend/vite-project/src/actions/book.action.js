import axios from "axios";


const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};

export const addBook = async (title, author, description, coverImage, releaseYear) => {
    try {
        const response = await axios.post(`http://localhost:5433/book/addBook`, { title, author, description, cover_image: coverImage, release_year: releaseYear });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Add book error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getBooks = async () => {
    try {
        const response = await axios.get(`http://localhost:5433/book/getBooks`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get all books error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5433/book/getBookById/${id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get book by id error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const updateBook = async (id, title, author, description, coverImage, releaseYear) => {
    try {
        const response = await axios.put(`http://localhost:5433/book/updateBook/${id}`, { title, author, description, cover_image: coverImage, release_year: releaseYear });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Update book error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5433/book/deleteBook/${id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Delete book error:", error);
        return baseApiResponse(error.response.data, false);
    }
};
