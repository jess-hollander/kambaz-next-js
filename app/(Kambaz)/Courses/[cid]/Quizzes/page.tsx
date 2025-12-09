"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz as deleteQuizAction, updateQuiz } from "./reducer";
import { useState, useEffect } from "react";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaBan, FaRocket } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Dropdown, Modal, Button } from "react-bootstrap";
import * as quizzesClient from "./client";

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  course: string;
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  published: boolean;
  questions: Array<{
    _id: string;
    type: string;
    title: string;
    points: number;
    question: string;
  }>;
}

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const fetchQuizzes = async () => {
    const courseQuizzes = await quizzesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(courseQuizzes));
  };

  const handleCreateQuiz = async () => {
    const newQuiz = await quizzesClient.createQuiz(cid as string, {
      title: "Unnamed Quiz",
      quizType: "GRADED_QUIZ",
      points: 0,
      assignmentGroup: "QUIZZES",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      published: false,
    });
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };

  const handleDeleteClick = (quizId: string) => {
    setQuizToDelete(quizId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (quizToDelete) {
      await quizzesClient.deleteQuiz(quizToDelete);
      dispatch(deleteQuizAction(quizToDelete));
    }
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    const updatedQuiz = await quizzesClient.togglePublishQuiz(quiz._id);
    dispatch(updateQuiz(updatedQuiz));
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!quiz.published) {
      return { text: "Not Published", color: "text-muted" };
    }

    if (availableDate && now < availableDate) {
      return {
        text: `Not available until ${availableDate.toLocaleDateString()}`,
        color: "text-muted",
      };
    }

    if (untilDate && now > untilDate) {
      return { text: "Closed", color: "text-muted" };
    }

    if (availableDate && untilDate && now >= availableDate && now <= untilDate) {
      return { text: "Available", color: "text-success" };
    }

    return { text: "Available", color: "text-success" };
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Sort quizzes by available date
  const sortedQuizzes = [...quizzes].sort((a, b) => {
    const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
    const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
    return dateA - dateB;
  });

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search for Quiz"
        />
        {isFaculty && (
          <div>
            <button className="btn btn-danger" onClick={handleCreateQuiz}>
              + Quiz
            </button>
          </div>
        )}
      </div>

      {sortedQuizzes.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p>No quizzes available.</p>
          {isFaculty && <p>Click the "+ Quiz" button to create one.</p>}
        </div>
      ) : (
        <ul className="list-group rounded-0">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              Assignment Quizzes
            </div>
            <ul className="list-group rounded-0">
              {sortedQuizzes.map((quiz) => {
                const availability = getAvailabilityStatus(quiz);
                return (
                  <li
                    key={quiz._id}
                    className="list-group-item p-3 ps-1 d-flex align-items-start"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <FaRocket className="me-3 fs-5 text-success" />
                    <div className="flex-grow-1">
                      <a
                        href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                        className="wd-quiz-link text-decoration-none text-dark fw-bold"
                      >
                        {quiz.title}
                      </a>
                      <div className="text-muted small">
                        <span className={availability.color}>
                          {availability.text}
                        </span>
                        {" | "}
                        <strong>Due</strong> {formatDate(quiz.dueDate)}
                        {" | "}
                        {quiz.points} pts
                        {" | "}
                        {quiz.questions?.length || 0} Questions
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      {quiz.published ? (
                        <FaCheckCircle className="text-success me-2" />
                      ) : (
                        <FaBan className="text-muted me-2" />
                      )}
                      {isFaculty && (
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="link"
                            className="text-dark p-0"
                            id={`dropdown-${quiz._id}`}
                          >
                            <IoEllipsisVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDeleteClick(quiz._id)}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleTogglePublish(quiz)}
                            >
                              {quiz.published ? "Unpublish" : "Publish"}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}