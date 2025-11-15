"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { FormControl, Button } from "react-bootstrap";

const API_BASE = process.env.NEXT_PUBLIC_REMOTE_SERVER || "https://kambaz-node-server-app-dli0.onrender.com";

interface Credentials {
  username?: string;
  password?: string;
}


export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/users/signin`, credentials);
      const user = response.data;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
      alert("Invalid username or password");
    }
  };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2"> Sign in </Button>
      <Link id="wd-signup-link" href="/Account/Signup"> Sign up </Link>
    </div>
  );
}