import React from "react";

export const Card = ({ title, overview }) => {
    return (
        <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="aspect-w-2 aspect-h-3">
                <img
                    src={`http://localhost:5433/book/getBooks`}
                    alt={title}
                    className="object-cover"
                />
            </div>
            <div className="p-4 h-40 overflow-y-hidden">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-700 text-base">
                    {overview}
                </p>
            </div>
        </div>
    );
};
