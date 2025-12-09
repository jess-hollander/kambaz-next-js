"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import * as quizzesClient from "../client";

interface Question {
  _id: string;
  type: string;
  title: string;
  points: number;
  question: string;
}

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
  questions: Question[];
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  const fetchQuiz = async () => {
    try {
      const quizData = await quizzesClient.findQuizById(qid as string);
      setQuiz(quizData);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async () => {
    if (!quiz) return;
    try {
      const updatedQuiz = await quizzesClient.togglePublishQuiz(quiz._id);
      setQuiz(updatedQuiz);
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div id="wd-quiz-details" className="container-fluid">
      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        {isFaculty && (
          <>
            <Button
              variant={quiz.published ? "secondary" : "success"}
              onClick={handleTogglePublish}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)}
            >
              Preview
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
            >
              Edit
            </Button>
          </>
        )}
        {!isFaculty && quiz.published && (
          <Button
            variant="danger"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}
          >
            Take Quiz
          </Button>
        )}
      </div>

      <hr />

      {/* Quiz Title */}
      <h2 className="mb-4">{quiz.title}</h2>

      {/* Quiz Details */}
      <div className="row">
        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr>
                <td className="fw-bold">Quiz Type</td>
                <td>{quiz.quizType.replace(/_/g, " ")}</td>
              </tr>
              <tr>
                <td className="fw-bold">Points</td>
                <td>{quiz.points}</td>
              </tr>
              <tr>
                <td className="fw-bold">Assignment Group</td>
                <td>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <td className="fw-bold">Shuffle Answers</td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Time Limit</td>
                <td>{quiz.timeLimit} Minutes</td>
              </tr>
              <tr>
                <td className="fw-bold">Multiple Attempts</td>
                <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
              </tr>
              {quiz.multipleAttempts && (
                <tr>
                  <td className="fw-bold">How Many Attempts</td>
                  <td>{quiz.howManyAttempts}</td>
                </tr>
              )}
              <tr>
                <td className="fw-bold">Show Correct Answers</td>
                <td>{quiz.showCorrectAnswers || "Not specified"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr>
                <td className="fw-bold">Access Code</td>
                <td>{quiz.accessCode || "None"}</td>
              </tr>
              <tr>
                <td className="fw-bold">One Question at a Time</td>
                <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Webcam Required</td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Lock Questions After Answering</td>
                <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Due</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(quiz.dueDate)}</td>
              <td>{formatDate(quiz.availableDate)}</td>
              <td>{formatDate(quiz.untilDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Description */}
      {quiz.description && (
        <div className="mt-4">
          <h5>Description</h5>
          <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
        </div>
      )}

      {/* Questions Summary */}
      <div className="mt-4">
        <h5>Questions</h5>
        <p>Total Questions: {quiz.questions?.length || 0}</p>
        <p>Total Points: {quiz.points}</p>
      </div>
    </div>
  );
}
