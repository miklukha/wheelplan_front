import { useSelector } from 'react-redux';
import { getIsLoggedIn, getToken, getUser } from '../redux/auth/authSelector';

export const useData = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUser);
  const token = useSelector(getToken);

  return {
    isLoggedIn,
    user,
    token,
  };
};
