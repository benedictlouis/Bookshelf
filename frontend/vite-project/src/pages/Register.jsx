import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link , useNavigate} from "react-router-dom";
import { signup } from "@/actions/user.action";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signup(username, email, password);
        if (response.success) {
            alert('Signup berhasil');
        } else {
            alert(`Error: ${response.data}`);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Button className="w-full" type="submit">Register</Button>
                    </CardFooter>
                </form>
                <div className="mb-5">
                    <p>Already have an account? <Link to="/login"><strong>Login</strong></Link></p>
                </div>
            </CardContent>
        </Card>
    );
}

export default Register;
