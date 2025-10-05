import axios from "axios";

// The single, correct base URL for your new backend
const API_BASE_URL = "http://localhost:3000/api";

/**
 * Fetches all data for a single entity (including details, summary, and graph) by its ID.
 * @param {string} entityId - The ID of the gene, disease, or publication.
 * @returns {Promise<object>} - A promise that resolves to the entity's data.
 */
export const getEntityData = async (entityId) => {
  if (!entityId) {
    // Avoid making a call with an undefined ID
    return null;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/docById/${entityId}`);
    // The new backend nests the response inside a 'data' property
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data for entity ${entityId}:`, error);
    // Return null or throw the error so the component knows the call failed
    return null;
  }
};

/**
 * Searches for entities based on a query string.
 * @param {string} query - The search term.
 * @returns {Promise<Array>} - A promise that resolves to an array of search results.
 */
export const searchEntities = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/docBySearch?q=${query}`);
    return response.data.data;
  } catch (error) {
    console.error("Error performing search:", error);
    return []; // Return an empty array on error
  }
};

/**
 * Fetches the list of popular tags from the backend.
 * @returns {Promise<Array>} - A promise that resolves to an array of tags.
 */
export const getTags = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};

/**
 * Sends a chat message to the backend and gets a response.
 * @param {string} entityId - The ID of the entity being discussed.
 * @param {Array} messages - The history of the conversation.
 * @returns {Promise<object>} - A promise that resolves to the AI's response.
 */
export const sendChatMessage = async (entityId, messages) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createChat`, {
      docId: entityId,
      messages: messages,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error sending chat message:", error);
    return {
      role: 'model',
      parts: 'Sorry, I encountered an error. Please try again.'
    };
  }
};