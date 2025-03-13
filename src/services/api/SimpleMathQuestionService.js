import axios from "../utils/axiosInstance";

/* Math Question Page */
export const postMathAnswer = async (name, question, answer, submitDate) => {
  try {
    await axios.post("simple_math", {
      name: name,
      question: question,
      answer: answer,
      submitDate: submitDate,
    });
  } catch (error) {
    console.error("Error fetching math answer", error);
    throw error;
  }
};

/* Math Solve Page */
export const getDaySubmissions = async (name, date) => {
  try {
    const response = await axios.get(
      `simple_math/day_count?name=${name}&submitDate=${date}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching day submissions", error);
    throw error;
  }
};

/* Simple Math */
export const getSimpleMathCounts = async (name, pageParams) => {
  const pageParam =
    "&page=" +
    pageParams.page +
    "&size=" +
    pageParams.size +
    "&sort=" +
    pageParams.sortParam +
    "," +
    pageParams.sortType;

  try {
    const response = await axios.get(
      `simple_math/day_counts/page/wrong?name=${name}${pageParam}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching simple submission counts : ", error);
    throw error;
  }
};
