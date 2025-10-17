"use client";
import { useParams } from "next/navigation";
import { BsCalendar3 } from "react-icons/bs";
import Link from "next/link";
import * as db from "../../../../Database";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
}

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();
    const assignments = db.assignments;
    const assignment = assignments.find((assignment: Assignment) => assignment._id === aid);

  return (
    <div id="wd-assignments-editor" className="container-fluid px-4 py-3">
      
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label fw-bold">
          Assignment Name
        </label>
        <input
          id="wd-name"
          className="form-control"
          defaultValue={assignment?.title || "New Assignment"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label fw-bold">
          Description
        </label>
        <div className="border rounded p-3" style={{ backgroundColor: "#f8f9fa" }}>
          <p className="mb-0">
            {assignment?.description || "No description available."}
          </p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="wd-points" className="form-label fw-bold">
            Points
          </label>
          <input
            id="wd-points"
            className="form-control"
            type="number"
            defaultValue={assignment?.points || 100}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-assignment-group" className="form-label fw-bold">
            Assignment Group
          </label>
          <select id="wd-assignment-group" className="form-select">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>PROJECTS</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-display-grade" className="form-label fw-bold">
            Display Grade as
          </label>
          <select id="wd-display-grade" className="form-select">
            <option>Percentage</option>
            <option>Points</option>
            <option>Complete/Incomplete</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="wd-submission-type" className="form-label fw-bold">
            Submission Type
          </label>
          <select id="wd-submission-type" className="form-select mb-3">
            <option>Online</option>
            <option>On Paper</option>
          </select>

          <div className="ms-3">
            <p className="fw-bold mb-2">Online Entry Options</p>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-entry-text" />
              <label className="form-check-label" htmlFor="wd-entry-text">
                Text Entry
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-entry-url" defaultChecked />
              <label className="form-check-label" htmlFor="wd-entry-url">
                Website URL
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-entry-media" />
              <label className="form-check-label" htmlFor="wd-entry-media">
                Media Recordings
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-entry-annotation" />
              <label className="form-check-label" htmlFor="wd-entry-annotation">
                Student Annotation
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-entry-file" />
              <label className="form-check-label" htmlFor="wd-entry-file">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="wd-assign-to" className="form-label fw-bold">
            Assign
          </label>
          
          <div className="border rounded p-3">
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label fw-bold">
                Assign to
              </label>
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-dark border me-2 px-2 py-1">
                  Everyone
                  <button type="button" className="btn-close btn-close-sm ms-1" aria-label="Close"></button>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label fw-bold">
                Due
              </label>
              <div className="input-group">
                <input 
                  id="wd-due-date" 
                  className="form-control" 
                  type="datetime-local" 
                  defaultValue={assignment?.dueDate ? `${assignment.dueDate}T23:59` : "2024-05-13T23:59"} 
                />
                <span className="input-group-text">
                  <i className="fas fa-calendar-alt"></i>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-12 mb-3">
                <label htmlFor="wd-available-from" className="form-label fw-bold">
                  Available from
                </label>
                <div className="input-group">
                  <input 
                    id="wd-available-from" 
                    className="form-control" 
                    type="datetime-local" 
                    defaultValue={assignment?.availableDate ? `${assignment.availableDate}T12:00` : "2024-05-06T12:00"} 
                    style={{ minWidth: "200px" }}
                  />
                  <span className="input-group-text">
                    <BsCalendar3 />
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-3">
                <label htmlFor="wd-available-until" className="form-label fw-bold">
                  Until
                </label>
                <div className="input-group">
                  <input 
                    id="wd-available-until" 
                    className="form-control" 
                    type="datetime-local" 
                    defaultValue="2024-05-20T23:59" 
                    style={{ minWidth: "200px" }}
                  />
                  <span className="input-group-text">
                    <BsCalendar3 />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <Link href={`/Courses/${cid}/Assignments`} id="wd-cancel" className="btn btn-secondary me-2">Cancel</Link>
        <Link href={`/Courses/${cid}/Assignments`} id="wd-save" className="btn btn-danger">Save</Link>
      </div>
    </div>
  );
}