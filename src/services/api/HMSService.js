import { isSimpleValidDate } from '../../utils/dateFormat';
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

export const logout = async () => {
  try {
    const data = await axios.post('/users/logout', {
      credentials: 'include', // 쿠키 포함 필수
    });

    return data;
  } catch (error) {
    console.error('Logout failed', error);
  }
};

export const refresh = async () => {
  try {
    const response = await axios.post('users/refresh');

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
export const getQuestionsWithStudentName = async (name, pageParams, date) => {
  const sortQuery = pageParams.sortParams
    .map((value, index) => `sort=${value},${pageParams.sortTypes[index]}`)
    .join('&');

  const pageQuery = `page=${pageParams.page}&size=${pageParams.size}&${sortQuery}`;
  const dateQuery = isSimpleValidDate(date) ? `?date=${date}&` : '?';

  try {
    const response = await axios.get(
      `/questions/student/${name}${dateQuery}${pageQuery}`
    );
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
  const sortQuery = pageParams.sortParams
    .map((value, index) => `sort=${value},${pageParams.sortTypes[index]}`)
    .join('&');

  const pageParam =
    '?page=' + pageParams.page + '&size=' + pageParams.size + '&' + sortQuery;

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

/* Tutoring Modify Page - Done */
export const patchQuestions = async (toModify) => {
  try {
    const response = await axios.patch('questions/multiples', toModify);

    return response;
  } catch (error) {
    console.error('Error fetching patch questions : ');
    throw error;
  }
};

/* Marking Page - DONE */
export const putSubmissions = async (mark, studentName) => {
  try {
    const response = await axios.put('submissions/mark/' + studentName, mark);

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
  const sortQuery = pageParams.sortParams
    .map((value, index) => `sort=${value},${pageParams.sortTypes[index]}`)
    .join('&');

  const pageParam =
    'page=' + pageParams.page + '&size=' + pageParams.size + '&' + sortQuery;

  try {
    const response = await axios.get(`submissions/review/${name}?${pageParam}`);

    return response.data.content;
  } catch (error) {
    console.error('Error fetching questions : ', error);
    throw error;
  }
};

/* Submission Page - DONE */
export const getAllSubmissions = async (name, pageParams, date) => {
  const sortQuery = pageParams.sortParams
    .map((value, index) => `sort=${value},${pageParams.sortTypes[index]}`)
    .join('&');

  const pageParam =
    'page=' + pageParams.page + '&size=' + pageParams.size + '&' + sortQuery;
  const dateQuery = isSimpleValidDate(date) ? `?date=${date}&` : '?';

  try {
    const response = await axios.get(
      `submissions/${name}${dateQuery}${pageParam}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions : ', error);
    throw error;
  }
};

/* Student Page (Subscriptions) */
export const getAllSubscriptions = async (name) => {
  try {
    // http://localhost:8080/api/v1/subscriptions?name=wl39
    const response = await axios.get(`subscriptions?name=${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions : ', error);
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

/* Calendar - DONE */
export const getStudentCalendarData = async (year, month, name) => {
  try {
    const response = await axios.get(
      'calendars/' + name + '/' + year + '/' + (month + 1)
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching calendars : ', error);
    throw error;
  }
};

/* Auth Check */
export const checkAuth = async () => {
  try {
    const response = await axios.get('users/auth-check');
    return response.data;
  } catch (error) {
    console.error('Error fetching user authentication : ', error);
    throw error;
  }
};

export const postService = async (name) => {
  try {
    const response = await axios.post('services', name, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching service : ', error);

    throw error;
  }
};

export const postSubscriptions = async (subscriptions) => {
  try {
    const response = await axios.post('subscriptions/multiples', subscriptions);

    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions : ', error);
    throw error;
  }
};

export const getAllServices = async () => {
  try {
    const response = await axios.get('services');

    return response.data;
  } catch (error) {
    console.error('Error fetching services : ', error);

    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const response = await axios.get('student');
    return response.data;
  } catch (error) {
    console.error('Error fetching students : ', error);

    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get('users');

    return response.data;
  } catch (error) {
    console.error('Error fetching students : ', error);

    throw error;
  }
};

export const getLatestSubmissionDayCountsByName = async (name) => {
  try {
    const response = await axios.get(
      `submissions/day_counts/latest?name=${name}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching day counts : ', error);

    throw error;
  }
};

export const getAllSubmissionDayCountsByName = async (name) => {
  try {
    const response = await axios.get(`submissions/day_counts?name=${name}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching day counts : ', error);

    throw error;
  }
};

export const getLatestSimpleMathSubmissionDayCountsByName = async (name) => {
  try {
    const response = await axios.get(
      `simple_math/day_counts/latest?name=${name}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching day counts : ', error);

    throw error;
  }
};

export const getSimpleQuestionsWithTopics = async (pageParams, searchTitle) => {
  try {
    const sortQuery = pageParams.sortParams
      .map((value, index) => `sort=${value},${pageParams.sortTypes[index]}`)
      .join('&');

    const basePath = searchTitle
      ? '/search?title=' + encodeURIComponent(searchTitle)
      : '';
    const pageQuery = `page=${pageParams.page}&size=${pageParams.size}&${sortQuery}`;
    const fullUrl = `questions/topics${basePath ? basePath + '&' + pageQuery : '?' + pageQuery
      }`;

    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTopics = async () => {
  try {
    const response = await axios.get('topics');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postTopic = async (topic) => {
  try {
    const response = await axios.post('topics', topic, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchQuestionsTopics = async (questionsTopics) => {
  try {
    const response = await axios.patch('questions/topics', questionsTopics, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSutdentTopicStats = async (pageParams, name) => {
  try {
    const sortQuery = pageParams.sortParams
      .map((value, index) => `sort=${value},${pageParams.sortTypes[index]}`)
      .join('&');

    const pageQuery = `?page=${pageParams.page}&size=${pageParams.size}&${sortQuery}`;
    const fullUrl = `stats/topics/page/${name}${pageQuery}`;

    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reloadTopicStats = async (name) => {
  try {
    const response = await axios.patch('stats/topics/reload/' + name);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reloadCalendars = async (name) => {
  try {
    const response = await axios.patch('calendars/' + name);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLatestAssignmentDate = async (name) => {
  try {
    const response = await axios.get('assignments/latest/' + name);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUser = async (user) => {
  try {
    const response = await axios.patch('users', user);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignChild = async (student, parent) => {
  try {
    const response = await axios.post('users/children/' + parent, [student]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getAllStudents = async (student, parent) => {
//   try {
//     const response = await axios.post('users/children/' + parent, [student]);

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getAllParents = async () => {
  try {
    const response = await axios.get('users/parents');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByName = async (name) => {
  try {
    const response = await axios.get('users/' + name);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalAssignmentCountsByName = async (name) => {
  try {
    const response = await axios.get('assignments/count/' + name);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllQuestionIdsByStudentName = async (name) => {
  try {
    const response = await axios.get('assignments/ids/' + name);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalSubmissionCountsByName = async (name) => {
  try {
    const response = await axios.get('submissions/count/' + name);

    return response.data;
  } catch (error) {
    throw error;
  }
};
