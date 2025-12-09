"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Form, Nav, Tab } from "react-bootstrap";
import * as quizzesClient from "../../client";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points: number;
  question: string;
  choices?: Choice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
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
  [key: string]: unknown;
}

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleSave = async () => {
    if (!quiz) return;
    try {
      await quizzesClient.updateQuiz(quiz._id, quiz);
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    try {
      await quizzesClient.updateQuiz(quiz._id, quiz);
      // Only toggle if quiz is currently unpublished
      if (!quiz.published) {
        await quizzesClient.togglePublishQuiz(quiz._id);
      }
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleInputChange = (field: string, value: unknown) => {
    if (!quiz) return;
    setQuiz({ ...quiz, [field]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div id="wd-quiz-editor" className="container-fluid">
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="details">Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="questions">Questions</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Details Tab */}
          <Tab.Pane eventKey="details">
            <Form>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </Form.Group>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label>Quiz Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={quiz.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </Form.Group>

              {/* Quiz Type */}
              <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={quiz.quizType}
                  onChange={(e) => handleInputChange("quizType", e.target.value)}
                >
                  <option value="GRADED_QUIZ">Graded Quiz</option>
                  <option value="PRACTICE_QUIZ">Practice Quiz</option>
                  <option value="GRADED_SURVEY">Graded Survey</option>
                  <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                </Form.Select>
              </Form.Group>

              {/* Assignment Group */}
              <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}
                >
                  <option value="QUIZZES">Quizzes</option>
                  <option value="EXAMS">Exams</option>
                  <option value="ASSIGNMENTS">Assignments</option>
                  <option value="PROJECT">Project</option>
                </Form.Select>
              </Form.Group>

              <h5 className="mt-4 mb-3">Options</h5>

              {/* Shuffle Answers */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Shuffle Answers"
                  checked={quiz.shuffleAnswers}
                  onChange={(e) => handleInputChange("shuffleAnswers", e.target.checked)}
                />
              </Form.Group>

              {/* Time Limit */}
              <Form.Group className="mb-3">
                <Form.Label>Time Limit (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => handleInputChange("timeLimit", parseInt(e.target.value))}
                />
              </Form.Group>

              {/* Multiple Attempts */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Allow Multiple Attempts"
                  checked={quiz.multipleAttempts}
                  onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)}
                />
              </Form.Group>

              {/* How Many Attempts */}
              {quiz.multipleAttempts && (
                <Form.Group className="mb-3">
                  <Form.Label>How Many Attempts</Form.Label>
                  <Form.Control
                    type="number"
                    value={quiz.howManyAttempts}
                    onChange={(e) =>
                      handleInputChange("howManyAttempts", parseInt(e.target.value))
                    }
                  />
                </Form.Group>
              )}

              {/* Show Correct Answers */}
              <Form.Group className="mb-3">
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.showCorrectAnswers}
                  onChange={(e) => handleInputChange("showCorrectAnswers", e.target.value)}
                  placeholder="e.g., Immediately, After due date"
                />
              </Form.Group>

              {/* Access Code */}
              <Form.Group className="mb-3">
                <Form.Label>Access Code</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.accessCode}
                  onChange={(e) => handleInputChange("accessCode", e.target.value)}
                />
              </Form.Group>

              {/* One Question at a Time */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="One Question at a Time"
                  checked={quiz.oneQuestionAtATime}
                  onChange={(e) =>
                    handleInputChange("oneQuestionAtATime", e.target.checked)
                  }
                />
              </Form.Group>

              {/* Webcam Required */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Webcam Required"
                  checked={quiz.webcamRequired}
                  onChange={(e) => handleInputChange("webcamRequired", e.target.checked)}
                />
              </Form.Group>

              {/* Lock Questions After Answering */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Lock Questions After Answering"
                  checked={quiz.lockQuestionsAfterAnswering}
                  onChange={(e) =>
                    handleInputChange("lockQuestionsAfterAnswering", e.target.checked)
                  }
                />
              </Form.Group>

              <h5 className="mt-4 mb-3">Assign</h5>

              {/* Due Date */}
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={
                    quiz.dueDate
                      ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                />
              </Form.Group>

              {/* Available Date */}
              <Form.Group className="mb-3">
                <Form.Label>Available from</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={
                    quiz.availableDate
                      ? new Date(quiz.availableDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) => handleInputChange("availableDate", e.target.value)}
                />
              </Form.Group>

              {/* Until Date */}
              <Form.Group className="mb-3">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={
                    quiz.untilDate
                      ? new Date(quiz.untilDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) => handleInputChange("untilDate", e.target.value)}
                />
              </Form.Group>
            </Form>
          </Tab.Pane>

          {/* Questions Tab */}
          <Tab.Pane eventKey="questions">
            <QuizQuestionsEditor 
              quiz={quiz} 
              onQuizUpdate={(updatedQuiz) => setQuiz(updatedQuiz as Quiz)} 
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Action Buttons */}
      <hr className="mt-4" />
      <div className="d-flex justify-content-end gap-2 mb-4">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="danger" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
