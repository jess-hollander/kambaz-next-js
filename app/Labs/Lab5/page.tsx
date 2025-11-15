"use client"
import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

const API_BASE = process.env.REACT_APP_API_BASE;

function Lab5() {
    return (
      <div id="wd-lab5">
        <h2>Lab 5 - Node.js</h2>
        <a className="btn btn-primary" href={`${API_BASE}/a5/welcome`}>
          Welcome
        </a>
        <EncodingParametersInURLs />
        <WorkingWithObjects />
        <WorkingWithArrays />
      </div>
    );
  }
  export default Lab5;