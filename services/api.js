import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Replace with your actual API base URL
const API_URL = 'http://3.128.173.76:8080/api';

// Function to handle user login
export const login = async (name, email) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { name, email });
    if (response.data.token && response.data.user) {
      const { token, user } = response.data;
      await AsyncStorage.setItem('user', JSON.stringify(user)); // Save user info
      await AsyncStorage.setItem('token', token); // Save token
    }

    return response.data; // Returns { token, user }
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

// Function to fetch tasks
export const fetchTasks = async (page) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Returns tasks array
  } catch (error) {
    throw new Error('Failed to fetch tasks. Please try again.');
  }
};
