
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || null);
  const [photoData, setPhoto] = useState(localStorage.getItem('userPhoto') || null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhoto', photoData);
  }, [token, email, photoData]);


  function updateIsAdmin(newValue) {
    setIsAdmin(newValue);
  }
 
  return (
    <AuthContext.Provider value={{ token, setToken, email, setEmail, photoData , setPhoto, isAdmin, updateIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


