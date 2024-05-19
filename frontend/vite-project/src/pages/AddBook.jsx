import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addBook } from "../actions/book.action";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [releaseYear, setReleaseYear] = useState("");

    const handleAddBook = async () => {
        if (
            title.trim() !== "" &&
            author.trim() !== "" &&
            description.trim() !== "" &&
            coverImage.trim() !== "" &&
            releaseYear.trim() !== ""
        ) {
            try {
                const response = await addBook(
                    title,
                    author,
                    description,
                    coverImage,
                    parseInt(releaseYear, 10)
                );
                if (response.success) {
                    alert("Book added successfully!");
                    setTitle("");
                    setAuthor("");
                    setDescription("");
                    setCoverImage("");
                    setReleaseYear("");
                } else {
                    alert("Failed to add book");
                }
            } catch (error) {
                console.error("Error adding book:", error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
            <div className="max-w-lg mx-auto">
                <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2"
                />
                <Input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mb-2"
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-2"
                />
                <Input
                    type="text"
                    placeholder="Cover Image URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="mb-2"
                />
                <Input
                    type="number"
                    placeholder="Release Year"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    className="mb-2"
                />
                <Button
                    onClick={handleAddBook}
                    className="font-bold py-2 px-4 rounded w-full"
                >
                    Add Book
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

export default AddBook;
