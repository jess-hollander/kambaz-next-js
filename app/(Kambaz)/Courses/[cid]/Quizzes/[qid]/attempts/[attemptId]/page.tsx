"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as quizzesClient from "../../../client";

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
  points: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  questions: Question[];
}

interface QuizAttempt {
  _id: string;
  quiz: string;
  user: string;
  attempt: number;
  answers: Array<{
    questionId: string;
    answer: string | boolean;
  }>;
  score: number;
  startedAt: string;
  submittedAt?: string;
}

export default function QuizResults() {
  const { cid, qid, attemptId } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const fetchResults = async () => {
    try {
      const [quizData, attemptData] = await Promise.all([
        quizzesClient.findQuizById(qid as string),
        quizzesClient.getAttemptById(attemptId as string),
      ]);
      setQuiz(quizData);
      setAttempt(attemptData);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionResult = (question: Question) => {
    if (!attempt) return { isCorrect: false, studentAnswer: null };

    const studentAnswer = attempt.answers.find((a) => a.questionId === question._id);
    if (!studentAnswer) return { isCorrect: false, studentAnswer: null };

    let isCorrect = false;

    if (question.type === "MULTIPLE_CHOICE") {
      const correctChoice = question.choices?.find((c) => c.isCorrect);
      isCorrect = studentAnswer.answer === correctChoice?.text;
    } else if (question.type === "TRUE_FALSE") {
      isCorrect = studentAnswer.answer === question.correctAnswer;
    } else if (question.type === "FILL_IN_BLANK") {
      const answerText = (studentAnswer.answer as string).toLowerCase().trim();
      isCorrect = question.possibleAnswers?.some(
        (pa) => pa.toLowerCase().trim() === answerText
      ) || false;
    }

    return { isCorrect, studentAnswer: studentAnswer.answer };
  };

  const canRetake = () => {
    if (!quiz || !attempt) return false;
    return quiz.multipleAttempts && attempt.attempt < quiz.howManyAttempts;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz || !attempt) {
    return <div>Results not found</div>;
  }

  const percentage = ((attempt.score / quiz.points) * 100).toFixed(1);

  return (
    <div id="wd-quiz-results" className="container-fluid">
      <h2 className="mb-4">{quiz.title} - Results</h2>

      {/* Score Summary */}
      <Alert variant="info" className="mb-4">
        <h4>Your Score</h4>
        <p className="mb-0">
          <strong>{attempt.score} / {quiz.points} points ({percentage}%)</strong>
        </p>
        <p className="mb-0 text-muted">
          Attempt {attempt.attempt} of {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
        </p>
        {attempt.submittedAt && (
          <p className="mb-0 text-muted">
            Submitted: {new Date(attempt.submittedAt).toLocaleString()}
          </p>
        )}
      </Alert>

      {/* Questions and Answers */}
      <h4 className="mb-3">Review Your Answers</h4>
      {quiz.questions.map((question, index) => {
        const { isCorrect, studentAnswer } = getQuestionResult(question);

        return (
          <Card key={question._id} className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5>
                  Question {index + 1}{" "}
                  {isCorrect ? (
                    <FaCheckCircle className="text-success ms-2" />
                  ) : (
                    <FaTimesCircle className="text-danger ms-2" />
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
                    const isStudentChoice = studentAnswer === choice.text;
                    const isCorrectChoice = choice.isCorrect;

                    return (
                      <div
                        key={idx}
                        className={`p-2 mb-2 border rounded ${
                          isCorrectChoice
                            ? "bg-success bg-opacity-10 border-success"
                            : isStudentChoice && !isCorrectChoice
                            ? "bg-danger bg-opacity-10 border-danger"
                            : ""
                        }`}
                      >
                        <div className="d-flex align-items-center">
                          {isStudentChoice && (
                            <span className="me-2">
                              {isCorrectChoice ? "✓" : "✗"}
                            </span>
                          )}
                          {isCorrectChoice && !isStudentChoice && (
                            <span className="me-2 text-success">✓ (Correct)</span>
                          )}
                          <span>{choice.text}</span>
                        </div>
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
                      question.correctAnswer === true
                        ? "bg-success bg-opacity-10 border-success"
                        : studentAnswer === true
                        ? "bg-danger bg-opacity-10 border-danger"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      {studentAnswer === true && (
                        <span className="me-2">
                          {question.correctAnswer === true ? "✓" : "✗"}
                        </span>
                      )}
                      {question.correctAnswer === true && studentAnswer !== true && (
                        <span className="me-2 text-success">✓ (Correct)</span>
                      )}
                      <span>True</span>
                    </div>
                  </div>
                  <div
                    className={`p-2 mb-2 border rounded ${
                      question.correctAnswer === false
                        ? "bg-success bg-opacity-10 border-success"
                        : studentAnswer === false
                        ? "bg-danger bg-opacity-10 border-danger"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      {studentAnswer === false && (
                        <span className="me-2">
                          {question.correctAnswer === false ? "✓" : "✗"}
                        </span>
                      )}
                      {question.correctAnswer === false && studentAnswer !== false && (
                        <span className="me-2 text-success">✓ (Correct)</span>
                      )}
                      <span>False</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Fill in the Blank */}
              {question.type === "FILL_IN_BLANK" && (
                <div>
                  <div
                    className={`p-3 mb-2 border rounded ${
                      isCorrect
                        ? "bg-success bg-opacity-10 border-success"
                        : "bg-danger bg-opacity-10 border-danger"
                    }`}
                  >
                    <strong>Your answer:</strong> {studentAnswer as string}
                  </div>
                  {!isCorrect && (
                    <div className="p-3 bg-success bg-opacity-10 border border-success rounded">
                      <strong>Correct answers:</strong>{" "}
                      {question.possibleAnswers?.join(", ")}
                    </div>
                  )}
                </div>
              )}

              {/* Points earned */}
              <div className="mt-3 text-end">
                <strong>
                  Points earned: {isCorrect ? question.points : 0} / {question.points}
                </strong>
              </div>
            </Card.Body>
          </Card>
        );
      })}

      {/* Action Buttons */}
      <div className="d-flex justify-content-between mt-4 mb-4">
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Back to Quizzes
        </Button>
        {canRetake() && (
          <Button
            variant="primary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}
          >
            Take Quiz Again
          </Button>
        )}
      </div>
    </div>
  );
}
