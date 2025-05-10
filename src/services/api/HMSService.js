import axios from '../utils/axiosInstance';

/* Login Page */
export const login = async (loginForm) => {
  try {
    const response = await axios.post('users/login', loginForm);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async (signupForm) => {
  try {
    const response = await axios.post('users/signup', signupForm);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* Upload Page - DONE */
export const postQuestion = async (questions) => {
  try {
    const response = await axios.post('questions', questions);

    return response;
  } catch (error) {
    console.error('Error fetching questions : ', error);
    throw error;
  }
};

/* Upload Multiple Page - DONE */
export const postQuestions = async (questions) => {
  try {
    const response = await axios.post('questions/multiples', questions);

    return response;
  } catch (error) {
    console.error('Error fetching questions : ', error);
    throw error;
  }
};

/* Tutoring Page - DONE */
export const getQuestionsWithStudentName = async (name, pageParams) => {
  const pageParam =
    '?page=' +
    pageParams.page +
    '&size=' +
    pageParams.size +
    '&sort=' +
    pageParams.sortParam +
    ',' +
    pageParams.sortType;

  try {
    const response = await axios.get(`/questions/student/${name}${pageParam}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching questions : ', error);
    throw error;
  }
};

/* Tutoring Page - DONE */
export const postAnswers = async (answers) => {
  try {
    const response = await axios.post('submissions/multiples', answers);

    return response.data.content;
  } catch (error) {
    console.error('Error fetching answers : ', error);
    throw error;
  }
};

/* Tutoring Archive Page - DONE */
export const getAllQuestions = async (pageParams) => {
  const pageParam =
    '?page=' +
    pageParams.page +
    '&size=' +
    pageParams.size +
    '&sort=' +
    pageParams.sortParam +
    ',' +
    pageParams.sortType;

  try {
    const questions = await axios.get('questions' + pageParam);

    return questions.data;
  } catch (error) {
    console.error('Error fetching questions : ', error);
    throw error;
  }
};

/* Tutoring Archive Page - DONE */
export const postReassignQuestions = async (
  questionIds,
  studentsFor,
  targetDate
) => {
  try {
    const response = await axios.post('assignments', {
      questionIds: questionIds,
      names: studentsFor,
      targetDate: targetDate,
    });

    return response;
  } catch (error) {
    console.error('Error fetching reassign questions : ', error);
    throw error;
  }
};

/* Marking Page - DONE */
export const putSubmissions = async (mark) => {
  try {
    const response = await axios.put('submissions/mark', mark);

    return response.data.content;
  } catch (error) {
    console.error('Error fetching mark : ', error);
    throw error;
  }
};

/* Marking Page - DONE */
export const getUnmarkedSubmissions = async (name) => {
  try {
    const response = await axios.get('submissions/mark/' + name);

    return response.data.content;
  } catch (error) {
    console.error('Error fetching unmarked submissions : ', error);
  }
};

/* Review Page - DONE */
export const getReviewQuestions = async (name, pageParams) => {
  const pageParam =
    'page=' +
    pageParams.page +
    '&size=' +
    pageParams.size +
    '&sort=' +
    pageParams.sortParam +
    ',' +
    pageParams.sortType;

  try {
    const response = await axios.get(`submissions/review/${name}?${pageParam}`);

    return response.data.content;
  } catch (error) {
    console.error('Error fetching questions : ', error);
    throw error;
  }
};

/* Submission Page - DONE */
export const getAllSubmissions = async (name, pageParams) => {
  const pageParam =
    '?page=' +
    pageParams.page +
    '&size=' +
    pageParams.size +
    '&sort=' +
    pageParams.sortParam +
    ',' +
    pageParams.sortType;

  try {
    const response = await axios.get(`submissions/${name}${pageParam}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions : ', error);
    throw error;
  }
};

/* Components */
/* Calendar - DONE */
export const getCalendarData = async (year, month, students) => {
  try {
    const response = await axios.get(
      'calendars/' + year + '/' + (month + 1) + '?students=' + students
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching calendars : ', error);
    throw error;
  }
};
