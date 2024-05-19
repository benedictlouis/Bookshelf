import axios from "axios";


const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};


export const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`http://localhost:5433/user/signup`, { username, email, password });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Signup error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`http://localhost:5433/user/login`, { username, password });
        localStorage.setItem("token", response.data.token);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Login error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get all users error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const getUserById = async (user_id) => {
    try {
        const response = await axios.get(`http://localhost:5433/user/getUserById/${user_id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Get user by id error:", error);
        return baseApiResponse(error.response.data, false);
    }
};


export const updateUser = async (user_id, username, email, password) => {
    try {
        const response = await axios.put(`${API_URL}/users/${user_id}`, { username, email, password });
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Update user error:", error);
        return baseApiResponse(error.response.data, false);
    }
};

export const deleteUser = async (user_id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${user_id}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Delete user error:", error);
        return baseApiResponse(error.response.data, false);
    }
};