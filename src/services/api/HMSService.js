import axios from "../utils/axiosInstance";

/* Upload Page */
export const postQuestion = async (questions) => {
  try {
    const response = await axios.post("questions", questions);

    return response;
  } catch (error) {
    console.error("Error fetching questions : ", error);
    throw error;
  }
};

/* Tutoring Page */
export const getQuestionsWithStudentName = async (name, pageParams) => {
  const pageParam =
    "?page=" +
    pageParams.page +
    "&size=" +
    pageParams.size +
    "&sort=" +
    pageParams.sortParam +
    "," +
    pageParams.sortType;

  try {
    const response = await axios.get(`/questions/page/${name}${pageParam}`);

    return response.data.content;
  } catch (error) {
    console.error("Error fetching questions : ", error);
    throw error;
  }
};

/* Tutoring Page */
export const postAnswers = async (answers) => {
  try {
    const response = await axios.post("submissions/multiples", answers);

    return response.data.content;
  } catch (error) {
    console.error("Error fetching answers : ", error);
    throw error;
  }
};

/* Tutoring Archive Page */
export const getAllQuestions = async (pageParams) => {
  const pageParam =
    "?page=" +
    pageParams.page +
    "&size=" +
    pageParams.size +
    "&sort=" +
    pageParams.sortParam +
    "," +
    pageParams.sortType;

  try {
    const questions = await axios.get("questions" + pageParam);

    return questions.data.content;
  } catch (error) {
    console.error("Error fetching questions : ", error);
    throw error;
  }
};

/* Tutoring Archive Page */
export const postReassignQuestions = async (
  questionIds,
  studentsFor,
  targetDate
) => {
  try {
    const response = await axios.post("questions/multiples", {
      questionIds: questionIds,
      studentsFor: studentsFor,
      targetDate: targetDate,
    });

    return response;
  } catch (error) {
    console.error("Error fetching reassign questions : ", error);
    throw error;
  }
};

/* Marking Page */
export const putSubmissions = async (name, mark) => {
  try {
    const response = await axios.put(
      "submissions/marks?studentName=" + name,
      mark
    );

    return response.data.content;
  } catch (error) {
    console.error("Error fetching mark : ", error);
    throw error;
  }
};

/* Marking Page */
export const getUnmarkedSubmissions = async (name) => {
  try {
    const response = await axios.get("submissions/saq?studentName=" + name);

    return response.data.content;
  } catch (error) {
    console.error("Error fetching unmarked submissions : ", error);
  }
};

/* Review Page */
export const getReviewQuestions = async (name, pageParams) => {
  const pageParam =
    "page=" +
    pageParams.page +
    "&size=" +
    pageParams.size +
    "&sort=" +
    pageParams.sortParam +
    "," +
    pageParams.sortType;

  try {
    const response = await axios.get(
      `submissions/review?studentName=${name}&${pageParam}`
    );

    return response.data.content;
  } catch (error) {
    console.error("Error fetching questions : ", error);
    throw error;
  }
};

/* Submission Page */
export const getAllSubmissions = async (name, isGettingAll, pageParams) => {
  const pageParam =
    "?page=" +
    pageParams.page +
    "&size=" +
    pageParams.size +
    "&sort=" +
    pageParams.sortParam +
    "," +
    pageParams.sortType;

  try {
    const response = await axios.get(
      `submissions?studentName=${name}&getAll=${isGettingAll}&${pageParam}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching submissions : ", error);
    throw error;
  }
};

/* Components */
/* Calendar */
export const getCalendarData = async (year, month, students) => {
  try {
    const response = await axios.get(
      "calendar/" + year + "/" + (month + 1) + "?students=" + students
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching calendars : ", error);
    throw error;
  }
};
