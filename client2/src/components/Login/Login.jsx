import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./Login.css";

const Login = () => {
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(emailAddress, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={emailAddress}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="btn-container">
        <button className="btn btn-outline-primary" disabled={isLoading}>
          Log in
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
