"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import { FormControl, Button } from "react-bootstrap";

const API_BASE = process.env.NEXT_PUBLIC_REMOTE_SERVER || "https://kambaz-node-server-app-dli0.onrender.com";

export default function Signup() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        role: "STUDENT"
    });
    const [verifyPassword, setVerifyPassword] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const signup = async () => {
        if (user.password !== verifyPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!user.username || !user.password) {
            alert("Username and password are required");
            return;
        }
        
        try {
            const response = await axios.post(`${API_BASE}/api/users/signup`, user);
            const newUser = response.data;
            dispatch(setCurrentUser(newUser));
            router.push("/Dashboard");
        } catch (error: unknown) {
            console.error("Signup failed:", error);
            if (error instanceof AxiosError && error.response) {
                alert(error.response.data?.message || "Signup failed. Please try again.");
            } else {
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div id="wd-signup-screen" className="container" style={{ maxWidth: "400px", marginTop: "2rem" }}>
            <h1 className="mb-4">Signup</h1>
            
            <div className="mb-3">
                <FormControl 
                    placeholder="username" 
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    placeholder="password" 
                    type="password" 
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    placeholder="verify password" 
                    type="password" 
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    className="form-control-lg"
                />
            </div>

            <div className="mb-3">
                <FormControl 
                    placeholder="first name" 
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    className="form-control-lg"
                />
            </div>

            <div className="mb-3">
                <FormControl 
                    placeholder="last name" 
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    className="form-control-lg"
                />
            </div>

            <div className="mb-3">
                <FormControl 
                    placeholder="email" 
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="form-control-lg"
                />
            </div>

            <div className="mb-4">
                <FormControl 
                    placeholder="date of birth" 
                    type="date"
                    value={user.dob}
                    onChange={(e) => setUser({ ...user, dob: e.target.value })}
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <Button onClick={signup} className="btn btn-primary w-100 btn-lg">
                    Signup
                </Button>
            </div>
            
            <div className="text-center">
                <Link href="Signin" className="text-decoration-none">
                    Signin
                </Link>
            </div>
        </div>
    );
}