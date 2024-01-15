import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

const authURL = 'http://localhost:5000/api/auth/login';
const signupURL = 'http://localhost:5000/api/auth/register';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

  const login = async (loginData) => {
    try {
      const response = await axios.post(authURL, { ...loginData });
      setUser({
        token: response.data.accessToken,
        userData: response.data.result,
      });
      saveUserToLocalStorage({
        token: response.data.accessToken,
        userData: response.data.result,
      });

      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      setUser(null);
      removeUserFromLocalStorage();
    }
  };

  const register = async (userInfo) => {
    try {
      const response = await axios.post(signupURL, { ...userInfo });
      setUser({
        token: response.data.accessToken,
        userData: response.data.result,
      });
      saveUserToLocalStorage({
        token: response.data.accessToken,
        userData: response.data.result,
      });
      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      setUser(null);
      removeUserFromLocalStorage();
    }
  };

  const logout = () => {
    setUser(null);
    removeUserFromLocalStorage();
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
