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
    console.log(pageParam);
    const response = await axios.get(`/questions/page/${name}${pageParam}`);
    console.log(response);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching questions : ", error);
    throw error;
  }
};
