import axios from "../utils/axiosInstance";

export const getRecentStopwatch = async (size) => {
  try {
    const response = await axios.get(
      `stopwatch?page=0&size=${size}&sort=id,desc`
    );

    return response;
  } catch (error) {
    console.error("Error fetching recent stopwatch", error);
    throw error;
  }
};

export const getRecentStopwatchByPage = async (size, page) => {
  try {
    const response = await axios.get(
      `stopwatch?page=${page}&size=${size}&sort=id,desc`
    );

    return response;
  } catch (error) {
    console.error("Error fetching recent stopwatch by page", error);
    throw error;
  }
};

export const postStopwatch = async (
  name,
  generatedDate,
  elapsedTime,
  type,
  relatedID
) => {
  try {
    const id = await axios.post("stopwatch", {
      name: name,
      generatedDate: generatedDate,
      elapsedTime: elapsedTime,
      type: type,
      relatedID: relatedID,
    });

    return id.data;
  } catch (error) {
    console.error("Error fetching start stopwatch", error);
    throw error;
  }
};

// export const postPauseStopwatch = async(name, relatedID, ge);
