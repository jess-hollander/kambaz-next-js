import React from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
    return (
        <div id="wd-signup-screen" className="container" style={{ maxWidth: "400px", marginTop: "2rem" }}>
            <h1 className="mb-4">Signup</h1>
            
            <div className="mb-3">
                <FormControl 
                    placeholder="username" 
                    defaultValue="jessicahollander"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    placeholder="password" 
                    type="password" 
                    defaultValue="password123"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-4">
                <FormControl 
                    placeholder="verify password" 
                    type="password" 
                    defaultValue="password123"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <Link href="Profile" className="btn btn-primary w-100 btn-lg">
                    Signup
                </Link>
            </div>
            
            <div className="text-center">
                <Link href="Signin" className="text-decoration-none">
                    Signin
                </Link>
            </div>
        </div>
    );
}
