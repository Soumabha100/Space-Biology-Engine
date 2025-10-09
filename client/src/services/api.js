import axios from "axios";

const API_BASE_URL = "https://sbke.vercel.app/api";

export const getEntityData = async (entityId) => {
  if (!entityId) {
    return null;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/docById/${entityId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data for entity ${entityId}:`, error);
    return null;
  }
};

export const searchEntities = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/docBySearch?q=${query}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error performing search:", error);
    return { data: [], total: 0 };
  }
};

export const searchByTags = async (tags, page = 1) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/docByTags?tags=${tags}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching by tags:", error);
    return { data: [], total: 0 };
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/docByTags`);
    return response.data.tags || [];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};

export const sendChatMessage = async (entityId, messages) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createChat`, {
      docId: entityId,
      messages: messages,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chat message:", error);
    return {status:500, data: error.response.data};
  }
};
