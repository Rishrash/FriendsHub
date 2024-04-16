import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const apiUrl = import.meta.env.VITE_API_HOST;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigateTo = useNavigate();

  const signup = async (
    emailAddress,
    password,
    firstName,
    lastName,
    username,
    dob,
    userRole
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${apiUrl}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailAddress,
        password,
        firstName,
        lastName,
        username,
        dob,
        role: userRole,
      }),
    });
    const json = await response.json();
    console.log("Json " + response);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // update loading state
      setIsLoading(false);
      navigateTo("/login");
    }
  };

  return { signup, isLoading, error };
};
