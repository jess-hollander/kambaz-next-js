import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// Quiz CRUD operations
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: Record<string, unknown>) => {
  const response = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quizId: string, updates: Record<string, unknown>) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, updates);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const togglePublishQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`);
  return response.data;
};

// Question operations
export const addQuestion = async (quizId: string, question: Record<string, unknown>) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  updates: Record<string, unknown>
) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
    updates
  );
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`
  );
  return response.data;
};

// Quiz attempt operations (for students)
export const getQuizAttempts = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return response.data;
};

export const getLatestAttempt = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/latest`);
  return response.data;
};

export const startAttempt = async (quizId: string) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`);
  return response.data;
};

export const submitAttempt = async (attemptId: string, answers: Array<{ questionId: string; answer: unknown }>) => {
  const response = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/attempts/${attemptId}/submit`,
    { answers }
  );
  return response.data;
};

export const getAttemptById = async (attemptId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/attempts/${attemptId}`);
  return response.data;
};
