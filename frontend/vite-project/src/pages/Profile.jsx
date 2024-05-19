import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../actions/user.action";

const Profile = () => {
    const { user_id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(user_id);

                if (response.success) {
                    setUserData(response.data);
                } else {
                    setError("Failed to fetch user data.");
                }
            } catch (error) {
                setError("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {userData && (
                <div>
                    <p><strong>User ID:</strong> {userData.user_id}</p>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
