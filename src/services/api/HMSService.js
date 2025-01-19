import axios from "../utils/axiosInstance";

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
