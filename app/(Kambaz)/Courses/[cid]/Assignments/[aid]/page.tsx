"use client";
import { useParams, useRouter } from "next/navigation";
import { BsCalendar3 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../../../Assignments/reducer";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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
    const router = useRouter();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const existingAssignment = assignments.find((assignment: Assignment) => assignment._id === aid);
    
    const [assignment, setAssignment] = useState<Assignment>({
      _id: aid || uuidv4(),
      title: "New Assignment",
      course: cid as string,
      description: "New Assignment Description",
      points: 100,
      dueDate: "2024-05-13",
      availableDate: "2024-05-06"
    });

    useEffect(() => {
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }, [existingAssignment]);

    const handleSave = () => {
      if (aid === "Editor") {
        // Creating new assignment
        dispatch(addAssignment({ ...assignment, _id: uuidv4() }));
      } else {
        // Updating existing assignment
        dispatch(updateAssignment(assignment));
      }
      router.push(`/Courses/${cid}/Assignments`);
    };

    const handleCancel = () => {
      router.push(`/Courses/${cid}/Assignments`);
    };

  return (
    <div id="wd-assignments-editor" className="container-fluid px-4 py-3">
      
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label fw-bold">
          Assignment Name
        </label>
        <input
          id="wd-name"
          className="form-control"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label fw-bold">
          New Assignment Description
        </label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        />
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
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
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
                  type="date" 
                  value={assignment.dueDate}
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                />
                <span className="input-group-text">
                  <BsCalendar3 />
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
                    type="date" 
                    value={assignment.availableDate}
                    onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
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
                    type="date" 
                    defaultValue="2024-05-20" 
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
        <button onClick={handleCancel} id="wd-cancel" className="btn btn-secondary me-2">Cancel</button>
        <button onClick={handleSave} id="wd-save" className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}