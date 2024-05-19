import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../actions/user.action';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(username, password);
        if (response.success) {
            alert('Login berhasil');
            navigate('/home'); // Navigate to '/home' after successful login
        } else {
            alert(`Error: ${response.data}`);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid w-full gap-4 mt-4">
                    <div className="flex flex-col items-start space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <CardFooter>
                        <Button className="w-full" type="submit">Login</Button> 
                    </CardFooter>
                </form>
                <div className="mb-5">
                    <p>Don't have an account? <Link to="/register"><strong>Register</strong></Link></p>
                </div>
            </CardContent>
        </Card>
    );
}

export default Login;
