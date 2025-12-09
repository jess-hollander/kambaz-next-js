import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="container py-5">
      <div className="text-center" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h1 className="display-1 fw-bold mb-5">Kambaz</h1>
        <div className="d-flex gap-3 justify-content-center mb-5">
          <Link href="/Account/Signin" className="btn btn-primary btn-lg">
            Sign In
          </Link>
          <Link href="/Account/Signup" className="btn btn-outline-primary btn-lg">
            Sign Up
          </Link>
        </div>

        <div className="mt-4">
          <h3 className="h5 mb-3">Team Members - Section 1</h3>
          <p className="mb-1">Jessica Hollander</p>
          <p className="mb-4">Garrick Cheng</p>

          <h3 className="h5 mb-3">GitHub Repositories</h3>
          <div className="d-flex gap-3 justify-content-center">
            <a 
              href="https://github.com/GarrickCheng/kambaz-next-js" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
            >
              <FaGithub className="me-2" />
              Frontend
            </a>
            <a 
              href="https://github.com/GarrickCheng/kambaz-node-server-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
            >
              <FaGithub className="me-2" />
              Backend
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
