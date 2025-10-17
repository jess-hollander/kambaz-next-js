import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
    return (
        <div id="wd-profile-screen" className="container" style={{ maxWidth: "400px", marginTop: "2rem" }}>
            <h1 className="mb-4">Profile</h1>
            
            <div className="mb-3">
                <FormControl 
                    defaultValue="alice" 
                    placeholder="username"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    defaultValue="123" 
                    placeholder="password" 
                    type="password"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    defaultValue="Alice" 
                    placeholder="First Name"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    defaultValue="Wonderland" 
                    placeholder="Last Name"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    defaultValue="2000-01-01" 
                    type="date" 
                    id="wd-dob"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-3">
                <FormControl 
                    defaultValue="alice@wonderland.com" 
                    type="email" 
                    id="wd-email"
                    placeholder="Email"
                    className="form-control-lg"
                />
            </div>
            
            <div className="mb-4">
                <FormSelect 
                    defaultValue="USER" 
                    id="wd-role"
                    className="form-select-lg"
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                </FormSelect>
            </div>
            
            <div className="mb-3">
                <Link href="Signin" className="btn btn-danger w-100 btn-lg">
                    Signout
                </Link>
            </div>
        </div>
    );
}
