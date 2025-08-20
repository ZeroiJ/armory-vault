
import axios from 'axios';

const BUNGIE_API_KEY = import.meta.env.VITE_BUNGIE_API_KEY;
const BUNGIE_API_BASE_URL = 'https://www.bungie.net/platform';

const bungieApi = axios.create({
  baseURL: BUNGIE_API_BASE_URL,
  headers: {
    'X-API-Key': BUNGIE_API_KEY,
  },
});

// Interceptor to add Authorization header for authenticated requests
bungieApi.interceptors.request.use(config => {
  const authData = JSON.parse(localStorage.getItem('guardian_auth'));
  if (authData && authData.accessToken) {
    config.headers.Authorization = `Bearer ${authData.accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getMembershipData = async (membershipId) => {
  try {
    const response = await bungieApi.get(`/User/GetMembershipsById/${membershipId}/254/`);
    return response.data.Response;
  } catch (error) {
    console.error('Error fetching membership data:', error);
    throw error;
  }
};

export const getCharacterData = async (membershipType, membershipId) => {
  try {
    // Components: 200 for characters, 201 for character equipment, 205 for character inventory
    const response = await bungieApi.get(`/Destiny2/${membershipType}/Profile/${membershipId}/?components=200,201,205`);
    return response.data.Response;
  } catch (error) {
    console.error('Error fetching character data:', error);
    throw error;
  }
};

export const getMilestones = async (membershipType, membershipId) => {
  try {
    const response = await bungieApi.get(`/Destiny2/${membershipType}/Profile/${membershipId}/?components=202`); // Component 202 for Milestones
    return response.data.Response.profileMilestones.data;
  } catch (error) {
    console.error('Error fetching milestones:', error);
    throw error;
  }
};

export const getVendors = async (membershipType, membershipId) => {
  try {
    const response = await bungieApi.get(`/Destiny2/${membershipType}/Profile/${membershipId}/?components=400`); // Component 400 for Vendors
    return response.data.Response.profileVendors.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

export const getActivities = async (membershipType, characterId) => {
  try {
    // This is a simplified example. Real activity fetching is more complex.
    // You'd typically need to iterate through characters and use component 204 (Activities)
    // For now, we'll return mock data or an empty array.
    return []; // Placeholder for actual activity fetching
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const getSeasonData = async (membershipType, membershipId) => {
  try {
    const response = await bungieApi.get(`/Destiny2/${membershipType}/Profile/${membershipId}/?components=1000`); // Component 1000 for Season data (example, actual component might vary)
    return response.data.Response.profileProgression.data; // Placeholder, adjust based on actual API response
  } catch (error) {
    console.error('Error fetching season data:', error);
    throw error;
  }
};
