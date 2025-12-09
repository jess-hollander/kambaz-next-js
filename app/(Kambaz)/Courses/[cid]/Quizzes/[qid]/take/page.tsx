"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import * as quizzesClient from "../../client";

interface Question {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points: number;
  question: string;
  choices?: Array<{ text: string; isCorrect: boolean }>;
  correctAnswer?: boolean;
  possibleAnswers?: string[];
}

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  points: number;
  oneQuestionAtATime: boolean;
  timeLimit: number;
  questions: Question[];
}

interface Answer {
  questionId: string;
  answer: string | boolean;
}

export default function QuizTake() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    startQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  const startQuiz = async () => {
    try {
      const quizData = await quizzesClient.findQuizById(qid as string);
      setQuiz(quizData);
      
      // Start attempt
      const attempt = await quizzesClient.startAttempt(qid as string);
      setAttemptId(attempt._id);
      
      // Initialize answers array
      setAnswers(
        quizData.questions.map((q: Question) => ({
          questionId: q._id,
          answer: "",
        }))
      );
      
      // Set timer
      if (quizData.timeLimit) {
        setTimeRemaining(quizData.timeLimit * 60); // Convert minutes to seconds
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, answer } : a))
    );
  };

  const handleSubmit = async () => {
    if (!attemptId) return;
    
    try {
      await quizzesClient.submitAttempt(attemptId, answers);
      router.push(`/Courses/${cid}/Quizzes/${qid}/attempts/${attemptId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderQuestion = (question: Question, index: number) => {
    const answer = answers.find((a) => a.questionId === question._id);

    return (
      <Card key={question._id} className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5>Question {index + 1}</h5>
            <span className="badge bg-secondary">{question.points} pts</span>
          </div>

          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />

          {/* Multiple Choice */}
          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              {question.choices?.map((choice, idx) => (
                <div key={idx} className="p-2 mb-2 border rounded">
                  <Form.Check
                    type="radio"
                    label={choice.text}
                    name={`question-${question._id}`}
                    checked={answer?.answer === choice.text}
                    onChange={() => handleAnswerChange(question._id, choice.text)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* True/False */}
          {question.type === "TRUE_FALSE" && (
            <div>
              <div className="p-2 mb-2 border rounded">
                <Form.Check
                  type="radio"
                  label="True"
                  name={`question-${question._id}`}
                  checked={answer?.answer === true}
                  onChange={() => handleAnswerChange(question._id, true)}
                />
              </div>
              <div className="p-2 mb-2 border rounded">
                <Form.Check
                  type="radio"
                  label="False"
                  name={`question-${question._id}`}
                  checked={answer?.answer === false}
                  onChange={() => handleAnswerChange(question._id, false)}
                />
              </div>
            </div>
          )}

          {/* Fill in the Blank */}
          {question.type === "FILL_IN_BLANK" && (
            <Form.Control
              type="text"
              value={(answer?.answer as string) || ""}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              placeholder="Enter your answer"
            />
          )}
        </Card.Body>
      </Card>
    );
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-quiz-take" className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        {timeRemaining !== null && (
          <Alert variant={timeRemaining < 60 ? "danger" : "info"} className="mb-0">
            Time Remaining: {formatTime(timeRemaining)}
          </Alert>
        )}
      </div>

      {quiz.description && (
        <div className="mb-4">
          <h5>Quiz Instructions</h5>
          <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
        </div>
      )}

      {/* No Questions Message */}
      {(!quiz.questions || quiz.questions.length === 0) && (
        <Alert variant="warning">
          <h5>No Questions Available</h5>
          <p>This quiz does not have any questions yet. Please contact your instructor.</p>
          <Button
            variant="secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Back to Quizzes
          </Button>
        </Alert>
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
                <Button variant="danger" onClick={handleSubmit}>
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {quiz.questions.map((question, index) => renderQuestion(question, index))}
            <div className="d-flex justify-content-end mt-4">
              <Button variant="danger" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
