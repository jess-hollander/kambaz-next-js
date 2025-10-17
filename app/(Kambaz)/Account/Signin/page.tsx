import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
    return (
        <div id="wd-signin-screen" className="container" style={{ maxWidth: "400px", marginTop: "2rem" }}>
            <h1 className="mb-4">Signin</h1>
            
            <div className="mb-3">
                <FormControl 
                    id="wd-username" 
                    placeholder="username"
                    defaultValue="jessicahollander"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-4">
                <FormControl 
                    id="wd-password" 
                    placeholder="password"
                    type="password" 
                    defaultValue="password123"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <Link id="wd-signin-btn" href="/Dashboard"
                    className="btn btn-primary w-100 btn-lg">
                    Signin
                </Link>
            </div>
            
            <div className="text-center">
                <Link id="wd-signup-link" href="Signup" className="text-decoration-none">
                    Signup
                </Link>
            </div>
        </div>
    );
}
