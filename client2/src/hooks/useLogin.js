import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigateTo = useNavigate();

  const login = async (emailAddress, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailAddress, password }),
    });
    const json = await response.json();
    console.log("Json " + JSON.stringify(response));
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
      navigateTo("/");
    }
  };

  return { login, isLoading, error };
};
