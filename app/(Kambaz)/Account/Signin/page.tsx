import Link from "next/link";
export default function Signin() {
    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            <input placeholder="username" defaultValue={"jessica.hollander"} /> <br />
            <input placeholder="password" type="password" defaultValue={"password123"} />
            <br />
            <Link id="wd-signin-btn" href="/Dashboard">
                Sign in </Link><br />
            <Link id="wd-signup-link" href="Signup">
                Sign up </Link>
        </div>
    );
}
