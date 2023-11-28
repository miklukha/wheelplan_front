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

export const getCategories = async () => {
  try {
    await getToken();
    const { data } = await axios.get('/api/categories/');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async categoryData => {
  try {
    await getToken();
    const { data } = await axios.post('/api/categories/', categoryData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * router.get('/:id', authenticate, isValidId, ctrl.getById);
router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);
router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById,
);
// Soft deletion
router.patch('/:id', authenticate, isValidId, ctrl.deleteById);
router.patch(
  '/:id/rating',
  authenticate,
  isValidId,
  validateBody(schemas.updateRatingSchema),
  ctrl.deleteById,
 */
