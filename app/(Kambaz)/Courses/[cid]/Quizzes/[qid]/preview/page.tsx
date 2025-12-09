"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as quizzesClient from "../../client";

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
  points: number;
  oneQuestionAtATime: boolean;
  questions: Question[];
}

interface Answer {
  questionId: string;
  answer: string | boolean;
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  const fetchQuiz = async () => {
    try {
      const quizData = await quizzesClient.findQuizById(qid as string);
      setQuiz(quizData);
      // Initialize answers array
      setAnswers(
        quizData.questions.map((q: Question) => ({
          questionId: q._id,
          answer: "",
        }))
      );
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, answer } : a))
    );
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    
    let totalScore = 0;
    quiz.questions.forEach((question) => {
      const answer = answers.find((a) => a.questionId === question._id);
      if (!answer) return;

      let isCorrect = false;
      
      if (question.type === "MULTIPLE_CHOICE") {
        const correctChoice = question.choices?.find((c) => c.isCorrect);
        isCorrect = answer.answer === correctChoice?.text;
      } else if (question.type === "TRUE_FALSE") {
        isCorrect = answer.answer === question.correctAnswer;
      } else if (question.type === "FILL_IN_BLANK") {
        const answerText = (answer.answer as string).toLowerCase().trim();
        isCorrect = question.possibleAnswers?.some(
          (pa) => pa.toLowerCase().trim() === answerText
        ) || false;
      }

      if (isCorrect) {
        totalScore += question.points;
      }
    });

    return totalScore;
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const renderQuestion = (question: Question, index: number) => {
    const answer = answers.find((a) => a.questionId === question._id);
    const isAnswered = answer && answer.answer !== "";

    let isCorrect = false;
    if (submitted) {
      if (question.type === "MULTIPLE_CHOICE") {
        const correctChoice = question.choices?.find((c) => c.isCorrect);
        isCorrect = answer?.answer === correctChoice?.text;
      } else if (question.type === "TRUE_FALSE") {
        isCorrect = answer?.answer === question.correctAnswer;
      } else if (question.type === "FILL_IN_BLANK") {
        const answerText = (answer?.answer as string || "").toLowerCase().trim();
        isCorrect = question.possibleAnswers?.some(
          (pa) => pa.toLowerCase().trim() === answerText
        ) || false;
      }
    }

    return (
      <Card key={question._id} className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5>
              Question {index + 1}{" "}
              {submitted && (
                isCorrect ? (
                  <FaCheckCircle className="text-success ms-2" />
                ) : (
                  <FaTimesCircle className="text-danger ms-2" />
                )
              )}
            </h5>
            <span className="badge bg-secondary">{question.points} pts</span>
          </div>

          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />

          {/* Multiple Choice */}
          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              {question.choices?.map((choice, idx) => {
                const isSelected = answer?.answer === choice.text;
                const showCorrect = submitted && choice.isCorrect;
                const showIncorrect = submitted && isSelected && !choice.isCorrect;

                return (
                  <div
                    key={idx}
                    className={`p-2 mb-2 border rounded ${
                      showCorrect
                        ? "bg-success bg-opacity-10 border-success"
                        : showIncorrect
                        ? "bg-danger bg-opacity-10 border-danger"
                        : ""
                    }`}
                  >
                    <Form.Check
                      type="radio"
                      label={choice.text}
                      name={`question-${question._id}`}
                      checked={isSelected}
                      onChange={() => handleAnswerChange(question._id, choice.text)}
                      disabled={submitted}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* True/False */}
          {question.type === "TRUE_FALSE" && (
            <div>
              <div
                className={`p-2 mb-2 border rounded ${
                  submitted && question.correctAnswer === true
                    ? "bg-success bg-opacity-10 border-success"
                    : submitted && answer?.answer === true && question.correctAnswer === false
                    ? "bg-danger bg-opacity-10 border-danger"
                    : ""
                }`}
              >
                <Form.Check
                  type="radio"
                  label="True"
                  name={`question-${question._id}`}
                  checked={answer?.answer === true}
                  onChange={() => handleAnswerChange(question._id, true)}
                  disabled={submitted}
                />
              </div>
              <div
                className={`p-2 mb-2 border rounded ${
                  submitted && question.correctAnswer === false
                    ? "bg-success bg-opacity-10 border-success"
                    : submitted && answer?.answer === false && question.correctAnswer === true
                    ? "bg-danger bg-opacity-10 border-danger"
                    : ""
                }`}
              >
                <Form.Check
                  type="radio"
                  label="False"
                  name={`question-${question._id}`}
                  checked={answer?.answer === false}
                  onChange={() => handleAnswerChange(question._id, false)}
                  disabled={submitted}
                />
              </div>
            </div>
          )}

          {/* Fill in the Blank */}
          {question.type === "FILL_IN_BLANK" && (
            <div>
              <Form.Control
                type="text"
                value={(answer?.answer as string) || ""}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                disabled={submitted}
                placeholder="Enter your answer"
                className={
                  submitted
                    ? isCorrect
                      ? "border-success"
                      : "border-danger"
                    : ""
                }
              />
              {submitted && !isCorrect && (
                <div className="mt-2 text-success">
                  <small>
                    Correct answers: {question.possibleAnswers?.join(", ")}
                  </small>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-quiz-preview" className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title} - Preview</h2>
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
        >
          Edit Quiz
        </Button>
      </div>

      {submitted && (
        <Alert variant="info" className="mb-4">
          <h4>Quiz Results</h4>
          <p className="mb-0">
            Score: {score} / {quiz.points} points ({((score / quiz.points) * 100).toFixed(1)}%)
          </p>
        </Alert>
      )}

      {quiz.description && (
        <div className="mb-4">
          <h5>Quiz Instructions</h5>
          <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
        </div>
      )}

      {/* No Questions Message */}
      {(!quiz.questions || quiz.questions.length === 0) && (
        <div className="alert alert-warning">
          This quiz has no questions yet. Please add questions in the Questions tab.
        </div>
      )}

      {/* Questions */}
      {quiz.questions && quiz.questions.length > 0 && (
        quiz.oneQuestionAtATime ? (
          <div>
            {quiz.questions[currentQuestionIndex] && renderQuestion(quiz.questions[currentQuestionIndex], currentQuestionIndex)}
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              >
                Previous
              </Button>
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                >
                  Next
                </Button>
              ) : (
                !submitted && (
                  <Button variant="danger" onClick={handleSubmit}>
                    Submit Quiz
                  </Button>
                )
              )}
            </div>
          </div>
        ) : (
          <div>
            {quiz.questions.map((question, index) => renderQuestion(question, index))}
            {!submitted && (
              <div className="d-flex justify-content-end mt-4">
                <Button variant="danger" onClick={handleSubmit}>
                  Submit Quiz
                </Button>
              </div>
            )}
          </div>
        )
      )}

      {submitted && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Back to Quizzes
          </Button>
        </div>
      )}
    </div>
  );
}
