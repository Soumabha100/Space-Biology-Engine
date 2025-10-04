import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getGraphData = async () => {
  const response = await axios.get(`${API_BASE_URL}/graph`);
  return response.data; // returns array
};

// Fix for JSON Server: summary is a nested object
export const getSummary = async (nodeId) => {
  const response = await axios.get(`${API_BASE_URL}/summary`);
  return response.data[nodeId]; // get value by key
};

export const getResources = async () => {
  const response = await axios.get(`${API_BASE_URL}/resources`);
  return response.data;
};