import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

axios.defaults.baseURL =
  'http://ec2-15-237-125-96.eu-west-3.compute.amazonaws.com:3000';

const getToken = async () => {
  try {
    const initialToken = await AsyncStorage.getItem('token');

    if (initialToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${initialToken}`;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getCategories = async () => {
//   try {
//     await getToken();
//     const { data } = await axios.get('/api/categories/');
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getGoalsByCategory = async category => {
  try {
    await getToken();
    const { data } = await axios.get(`/api/goals/category/${category}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addGoal = async goalData => {
  try {
    await getToken();
    const { data } = await axios.post('/api/goals/', goalData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateGoal = async (goalId, goalData) => {
  try {
    await getToken();
    const { data } = await axios.put(`/api/goals/${goalId}`, goalData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGoal = async goalId => {
  try {
    await getToken();
    const { data } = await axios.patch(`/api/goals/${goalId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateGoalStatus = async (goalId, goalData) => {
  try {
    await getToken();
    const { data } = await axios.patch(`/api/goals/${goalId}/status`, goalData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
