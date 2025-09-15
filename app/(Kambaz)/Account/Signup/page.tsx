import React from "react";
import Link from "next/link";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input placeholder="username" /><br />
            <input placeholder="password" type="password" /><br />
            <input placeholder="verify password" type="password" /><br />
            <Link href="Profile" > Sign up </Link><br /> // had to change the to= as it was an invalid prop
            <Link href="Signin" >Sign in</Link>
        </div>
    );
}
