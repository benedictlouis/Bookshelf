import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getBookById, updateBook } from "../actions/book.action";

const EditBook = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        description: "",
        cover_image: "", 
        release_year: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(id);
                if (response.success) {
                    setBookData(response.data);
                } else {
                    setError("Failed to fetch book details.");
                }
            } catch (error) {
                setError("Error fetching book details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBook(); 
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleEditBook = async () => {
        try {
            const response = await updateBook(
                id,
                bookData.title,
                bookData.author,
                bookData.description,
                bookData.cover_image,
                bookData.release_year
            );

            if (response.success) {
                alert("Book updated successfully!");
            } else {
                alert("Failed to update book");
            }
        } catch (error) {
            console.error("Error updating book:", error);
            alert("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
            <div className="max-w-lg mx-auto">
                <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={bookData.title}
                    onChange={handleInputChange}
                    className="mb-2"
                />
                <Input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={bookData.author}
                    onChange={handleInputChange}
                    className="mb-2"
                />
                <Textarea
                    name="description"
                    placeholder="Description"
                    value={bookData.description}
                    onChange={handleInputChange}
                    className="mb-2"
                />
                <Input
                    type="text"
                    name="cover_image"
                    placeholder="Cover Image URL"
                    value={bookData.cover_image}
                    onChange={handleInputChange}
                    className="mb-2"
                />
                <Input
                    type="number"
                    name="release_year"
                    placeholder="Release Year"
                    value={bookData.release_year}
                    onChange={handleInputChange}
                    className="mb-2"
                />
                <Button
                    onClick={handleEditBook}
                    className="font-bold py-2 px-4 rounded w-full"
                >
                    Update Book
                </Button>
                <Link to="/home">
                    <Button
                        variant="outline"
                        className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white"
                    >
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default EditBook;
