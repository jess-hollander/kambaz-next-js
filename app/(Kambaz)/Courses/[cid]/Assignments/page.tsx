"use client";
import { useParams } from "next/navigation";
import { BsGripVertical, BsCheckCircle, BsPlus, BsSearch } from "react-icons/bs";
import { FaFileAlt, FaTrash } from "react-icons/fa";
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "../../Assignments/reducer";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const isFaculty = currentUser?.role === "FACULTY";
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

        {/* Buttons Group and Assignment - Faculty Only */}
        {isFaculty && (
          <div>
            <button className="btn btn-outline-secondary me-2">+ Group</button>
            <Link href={`/Courses/${cid}/Assignments/Editor`} className="btn btn-danger">
              <BsPlus className="me-1" /> Assignment
            </Link>
          </div>
        )}
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

      <ul id="wd-assignment-list" className="list-group">
        {assignments
          .filter((assignment: Assignment) => assignment.course === cid)
          .map((assignment: Assignment) => (
            <li key={assignment._id} className="wd-assignment-list-item list-group-item p-0 mb-3 border-0 border-start border-success border-4">
              <div className="d-flex align-items-center">
                <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-decoration-none text-dark d-block p-3 flex-grow-1" style={{ transition: "background-color 0.2s" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-start">
                      <BsGripVertical className="me-3 text-muted" />
                      <FaFileAlt className="me-3 text-success fs-5" />
                      <div>
                        <div>
                          <strong>{assignment.title}</strong>
                        </div>
                        <div className="text-muted small">
                          Multiple Modules | Not available until {new Date(assignment.availableDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 12:00am <br />
                          <strong>Due</strong> {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 11:59pm | {assignment.points} pts
                        </div>
                      </div>
                    </div>
                    <BsCheckCircle className="text-success fs-4" />
                  </div>
                </Link>
                {isFaculty && (
                  <div className="me-3">
                    <FaTrash 
                      className="text-danger" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteClick(assignment._id)}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>

      {/* Delete Confirmation Dialog */}
      <Modal show={showDeleteDialog} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}