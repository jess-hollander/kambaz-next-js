"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

interface Credentials {
  username?: string;
  password?: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = () => {
    const user = db.users.find(
      (u: User) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (user) {
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
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