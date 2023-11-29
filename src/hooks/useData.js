import { useSelector } from 'react-redux';
import { getIsLoggedIn, getToken, getUser } from '../redux/auth/authSelector';
import { getCategoriesData } from '../redux/categories/categoriesSelector';

export const useData = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUser);
  const token = useSelector(getToken);
  const categories = useSelector(getCategoriesData);

  return {
    isLoggedIn,
    user,
    token,
    categories,
  };
};
