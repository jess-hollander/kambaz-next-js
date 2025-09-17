import React from "react";
import Link from "next/link";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input placeholder="username" defaultValue={"jess.holl"} /><br />
            <input placeholder="password" type="password" defaultValue={"password123"} /><br />
            <input placeholder="verify password" type="password" defaultValue={"password123"} /><br />
            <Link href="Profile" > Sign up </Link><br />
            <Link href="Signin" >Sign in</Link>
        </div>
    );
}
