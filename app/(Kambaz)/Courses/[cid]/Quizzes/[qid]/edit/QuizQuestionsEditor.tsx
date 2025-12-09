"use client";
import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";
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
  points: number;
  questions: Question[];
}

interface Props {
  quiz: Quiz;
  onQuizUpdate: (quiz: Quiz) => void;
}

export default function QuizQuestionsEditor({ quiz, onQuizUpdate }: Props) {
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question> | null>(null);

  const handleAddQuestion = () => {
    setNewQuestion({
      type: "MULTIPLE_CHOICE",
      title: "",
      points: 1,
      question: "",
      choices: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
    });
  };

  const handleSaveQuestion = async (question: Partial<Question>) => {
    try {
      if (question._id) {
        // Update existing question
        await quizzesClient.updateQuestion(quiz._id, question._id, question);
        const updatedQuiz = await quizzesClient.findQuizById(quiz._id);
        onQuizUpdate(updatedQuiz);
        setEditingQuestionId(null);
        setEditingQuestion(null);
      } else {
        // Create new question
        await quizzesClient.addQuestion(quiz._id, question);
        const updatedQuiz = await quizzesClient.findQuizById(quiz._id);
        onQuizUpdate(updatedQuiz);
        setNewQuestion(null);
      }
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await quizzesClient.deleteQuestion(quiz._id, questionId);
      const updatedQuiz = await quizzesClient.findQuizById(quiz._id);
      onQuizUpdate(updatedQuiz);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setEditingQuestion(null);
    setNewQuestion(null);
  };

  const renderQuestionEditor = (question: Partial<Question>, isNew: boolean = false) => {
    const currentQuestion = isNew ? newQuestion : editingQuestion || question;
    
    const updateQuestion = (field: string, value: unknown) => {
      if (isNew) {
        setNewQuestion({ ...newQuestion, [field]: value });
      } else {
        setEditingQuestion({ ...currentQuestion, [field]: value });
      }
    };

    return (
      <Card className="mb-3">
        <Card.Body>
          {/* Question Type */}
          <Form.Group className="mb-3">
            <Form.Label>Question Type</Form.Label>
            <Form.Select
              value={currentQuestion?.type}
              onChange={(e) => {
                const newType = e.target.value as Question["type"];
                const updated: Partial<Question> = {
                  ...currentQuestion,
                  type: newType,
                };
                
                // Reset type-specific fields
                if (newType === "MULTIPLE_CHOICE") {
                  updated.choices = [
                    { text: "", isCorrect: true },
                    { text: "", isCorrect: false },
                  ];
                  delete updated.correctAnswer;
                  delete updated.possibleAnswers;
                } else if (newType === "TRUE_FALSE") {
                  updated.correctAnswer = true;
                  delete updated.choices;
                  delete updated.possibleAnswers;
                } else if (newType === "FILL_IN_BLANK") {
                  updated.possibleAnswers = [""];
                  delete updated.choices;
                  delete updated.correctAnswer;
                }
                
                if (isNew) {
                  setNewQuestion(updated);
                } else {
                  setEditingQuestion(updated);
                }
              }}
            >
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option value="TRUE_FALSE">True/False</option>
              <option value="FILL_IN_BLANK">Fill in the Blank</option>
            </Form.Select>
          </Form.Group>

          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={currentQuestion?.title || ""}
              onChange={(e) => updateQuestion("title", e.target.value)}
              placeholder="Question title"
            />
          </Form.Group>

          {/* Question Text */}
          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={currentQuestion?.question || ""}
              onChange={(e) => updateQuestion("question", e.target.value)}
              placeholder="Enter your question"
            />
          </Form.Group>

          {/* Points */}
          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={currentQuestion?.points || 1}
              onChange={(e) => updateQuestion("points", parseInt(e.target.value))}
            />
          </Form.Group>

          {/* Type-specific fields */}
          {currentQuestion?.type === "MULTIPLE_CHOICE" && (
            <div>
              <Form.Label>Answers</Form.Label>
              {currentQuestion?.choices?.map((choice, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Check
                    type="radio"
                    name={`correct-${currentQuestion?._id || "new"}`}
                    checked={choice.isCorrect}
                    onChange={() => {
                      const updatedChoices = currentQuestion?.choices?.map((c, i) => ({
                        ...c,
                        isCorrect: i === index,
                      }));
                      updateQuestion("choices", updatedChoices);
                    }}
                    className="me-2"
                  />
                  <Form.Control
                    type="text"
                    value={choice.text}
                    onChange={(e) => {
                      const updatedChoices = currentQuestion?.choices?.map((c, i) =>
                        i === index ? { ...c, text: e.target.value } : c
                      );
                      updateQuestion("choices", updatedChoices);
                    }}
                    placeholder={`Possible Answer`}
                    className="flex-grow-1 me-2"
                  />
                  {currentQuestion?.choices && currentQuestion.choices.length > 2 && (
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => {
                        const updatedChoices = currentQuestion?.choices?.filter(
                          (_, i) => i !== index
                        );
                        updateQuestion("choices", updatedChoices);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={() => {
                  updateQuestion("choices", [
                    ...(currentQuestion?.choices || []),
                    { text: "", isCorrect: false },
                  ]);
                }}
              >
                + Add Another Answer
              </Button>
            </div>
          )}

          {currentQuestion?.type === "TRUE_FALSE" && (
            <div>
              <Form.Label>Correct Answer</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="True"
                  name={`tf-${currentQuestion?._id || "new"}`}
                  checked={currentQuestion?.correctAnswer === true}
                  onChange={() => updateQuestion("correctAnswer", true)}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name={`tf-${currentQuestion?._id || "new"}`}
                  checked={currentQuestion?.correctAnswer === false}
                  onChange={() => updateQuestion("correctAnswer", false)}
                />
              </div>
            </div>
          )}

          {currentQuestion?.type === "FILL_IN_BLANK" && (
            <div>
              <Form.Label>Possible Answers</Form.Label>
              {currentQuestion?.possibleAnswers?.map((answer, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      const updatedAnswers = currentQuestion?.possibleAnswers?.map((a, i) =>
                        i === index ? e.target.value : a
                      );
                      updateQuestion("possibleAnswers", updatedAnswers);
                    }}
                    placeholder="Possible correct answer"
                    className="flex-grow-1 me-2"
                  />
                  {currentQuestion?.possibleAnswers && currentQuestion.possibleAnswers.length > 1 && (
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => {
                        const updatedAnswers = currentQuestion?.possibleAnswers?.filter(
                          (_, i) => i !== index
                        );
                        updateQuestion("possibleAnswers", updatedAnswers);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={() => {
                  updateQuestion("possibleAnswers", [
                    ...(currentQuestion?.possibleAnswers || []),
                    "",
                  ]);
                }}
              >
                + Add Another Answer
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => currentQuestion && handleSaveQuestion(currentQuestion)}>
              {isNew ? "Save" : "Update Question"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      {/* Existing Questions */}
      {quiz.questions.map((question) => (
        <div key={question._id}>
          {editingQuestionId === question._id ? (
            renderQuestionEditor(question, false)
          ) : (
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5>{question.title || "Untitled Question"}</h5>
                    <p className="text-muted">
                      {question.type.replace(/_/g, " ")} | {question.points} pts
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: question.question }} />
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="link"
                      onClick={() => {
                        setEditingQuestionId(question._id);
                        setEditingQuestion(question);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      ))}

      {/* New Question Form */}
      {newQuestion && renderQuestionEditor(newQuestion, true)}

      {/* Add Question Button */}
      {!newQuestion && (
        <Button variant="secondary" onClick={handleAddQuestion} className="mt-3">
          <FaPlus className="me-2" />
          New Question
        </Button>
      )}

      {/* Total Points */}
      <div className="mt-4 p-3 bg-light">
        <strong>Total Points: {quiz.points}</strong>
      </div>
    </div>
  );
}
