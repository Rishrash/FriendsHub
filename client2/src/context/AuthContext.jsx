import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define the merged AuthContext
export const AuthContext = createContext();

// Define the reducer for managing authentication state
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { authUser: action.payload };
    case 'LOGOUT':
      return { authUser: null };
    default:
      return state;
  }
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    authUser: JSON.parse(localStorage.getItem('user')) || null,
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.authUser));
  }, [state.authUser]);

  useEffect(() => {
    console.log('AuthContext state:', state);
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
