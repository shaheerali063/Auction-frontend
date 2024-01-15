import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

const authURL = 'http://localhost:5000/api/auth/login';
const signupURL = 'http://localhost:5000/api/auth/register';
// const userInfoURL = 'http://localhost:3000/api/users/current_logged_in_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (loginData) => {
    try {
      const response = await axios.post(authURL, { ...loginData });
      setUser({
        token: response.data.accessToken,
        userData: response.data.result,
      });
      if (response.data.success) {
        navigate('/');
      }
      //   if (response.data.role === 'admin') {
      //     navigate('/admin', { replace: true });
      //   } else {
      //     navigate('/', { replace: true });
      //   }
    } catch (error) {
      setUser(null);
    }
  };

  const register = async (userInfo) => {
    try {
      const response = await axios.post(signupURL, { ...userInfo });
      setUser({
        token: response.data.accessToken,
        userData: response.data.result,
      });
      if (response.data.success) {
        navigate('/');
      }
      // const userResponse = await axios.get(userInfoURL, {
      //   headers: { Authorization: response.data.auth_token },
      // });

      //   if (userResponse.data.role === 'admin') {
      //     navigate('/admin', { replace: true });
      //   } else {
      //     navigate('/', { replace: true });
      //   }
    } catch (error) {
      setUser(null);
    }
  };

  //   const invite = async (userInfo, id) => {
  //     try {
  //       await axios.post(
  //         `http://localhost:3000/api/users/${id}/invite`,
  //         {
  //           user: userInfo,
  //         },
  //         {
  //           headers: {
  //             Authorization: user.token,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
