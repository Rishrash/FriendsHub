import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

const Signup = () => {
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [userRole, setUserRole] = useState("user");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Await the signup method to complete
      const response = await signup(
        emailAddress,
        password,
        firstName,
        lastName,
        username,
        dob,
        userRole
      );
    } catch (error) {
      // Handle any errors that occur during the signup process
      console.error("Error during signup:", error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

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
      <label>User Role:</label>
      <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <label>Date of Birth:</label>
      <input type="date" onChange={(e) => setDob(e.target.value)} value={dob} />
      <div className="btn-container">
        <button className="btn btn-outline-primary" disabled={isLoading}>
          Sign up
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
