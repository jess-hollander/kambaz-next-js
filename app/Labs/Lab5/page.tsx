"use client"
import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

const API_BASE = process.env.NEXT_PUBLIC_REMOTE_SERVER;

function Lab5() {
    return (
      <div id="wd-lab5">
        <h2>Lab 5 - Node.js</h2>
        <a className="btn btn-primary" href={`${API_BASE}/lab5/welcome`}>
          Welcome
        </a>
        <EncodingParametersInURLs />
        <WorkingWithObjects />
        <WorkingWithArrays />
      </div>
    );
  }
  export default Lab5;