"use client";
import { BsGripVertical, BsCheckCircle, BsPlus, BsSearch } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import Link from 'next/link';
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function Assignments() {
  return (
    <>
      <style jsx>{`
        .wd-assignment-link:hover {
          background-color: #f8f9fa !important;
        }
      `}</style>
      <div id="wd-assignmentsContent" className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger">Assignments</h2>

        {/* Buttons Group and Assignment */}
        <div>
          <button className="btn btn-outline-secondary me-2">+ Group</button>
          <Link href="/Courses/1234/Assignments/Editor" className="btn btn-danger">
            <BsPlus className="me-1" /> Assignment
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-4">
        <span className="input-group-text">
          <BsSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Assignments"
        />
      </div>

      {/* Assignments List */}
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light border">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2" />
          <strong>ASSIGNMENTS</strong>
        </div>
        <div className="text-muted">
          40% of Total <BsPlus className="ms-2" />
        </div>
      </div>

      <ListGroup id="wd-assignment-list" className="list-group">
        {/* Assignment 1 */}
        <ListGroupItem className="wd-assignment-list-item list-group-item p-0 mb-3 border-0 border-start border-4 border-success">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none text-dark d-block p-3" style={{ transition: "background-color 0.2s" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-3 text-muted" />
                <FaFileAlt className="me-3 text-success fs-5" />
                <div>
                  <div>
                    <strong>A1</strong>
                  </div>
                  <div className="text-muted small">
                    Multiple Modules | Not available until May 6 at 12:00am <br />
                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <BsCheckCircle className="text-success fs-4" />
            </div>
          </Link>
        </ListGroupItem>

        {/* Assignment 2 */}
        <ListGroupItem className="wd-assignment-list-item list-group-item p-0 mb-3 border-0 border-start border-4 border-success">
          <Link href="/Courses/1234/Assignments/2" className="wd-assignment-link text-decoration-none text-dark d-block p-3" style={{ transition: "background-color 0.2s" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-3 text-muted" />
                <FaFileAlt className="me-3 text-success fs-5" />
                <div>
                  <div>
                    <strong>A2</strong>
                  </div>
                  <div className="text-muted small">
                    Multiple Modules | Not available until May 13 at 12:00am <br />
                    <strong>Due</strong> May 20 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <BsCheckCircle className="text-success fs-4" />
            </div>
          </Link>
        </ListGroupItem>

        {/* Assignment 3 */}
        <ListGroupItem className="wd-assignment-list-item list-group-item p-0 mb-3 border-0 border-start border-4 border-success">
          <Link href="/Courses/1234/Assignments/3" className="wd-assignment-link text-decoration-none text-dark d-block p-3" style={{ transition: "background-color 0.2s" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-3 text-muted" />
                <FaFileAlt className="me-3 text-success fs-5" />
                <div>
                  <div>
                    <strong>A3</strong>
                  </div>
                  <div className="text-muted small">
                    Multiple Modules | Not available until May 20 at 12:00am <br />
                    <strong>Due</strong> May 27 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <BsCheckCircle className="text-success fs-4" />
            </div>
          </Link>
        </ListGroupItem>
      </ListGroup>
      </div>
    </>
  );
}