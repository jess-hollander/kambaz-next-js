"use client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/page";
import KambazNavigation from "./Navigation";
import Signin from "./Account/Signin/page";
import CourseNavigation from "./Courses/[cid]/Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Home from "./Courses/[cid]/Home/page";
import Modules from "./Courses/[cid]/Modules/page";
import Assignments from "./Courses/[cid]/Assignments/page";
import AssignmentEditor from "./Courses/[cid]/Assignments/[aid]/page";
import CourseStatus from "./Courses/[cid]/Home/Status";
import "./styles.css";
export default function Kambaz() {
    return (
<Router>
<div>
    <div id="wd-kambaz">
        <KambazNavigation />
        <div  className="wd-main-content-offset p-3">
            <Routes>
                <Route path="/" element={<Navigate to="Account" />} />
                <Route path="/Account/*" element={<Signin />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Courses/:cid/*/Home" element={<Home />} />
            </Routes>
        </div>
    </div>

    <div id="wd-courses">
        <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" />
            Course 1234 </h2> <hr />
        <div className="d-flex">
            <div className="d-none d-md-block">
                <CourseNavigation />
            </div>
            <div className="flex-fill">
                <Routes>
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                </Routes>
            </div></div>
    </div>
    <div className="d-flex" id="wd-home">
        <div className="flex-fill me-3">
            <Modules />
        </div>
        <div className="d-none d-xl-block">
            <CourseStatus />
        </div>
    </div>

</div>
</Router>
    );
}