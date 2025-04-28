import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import styles from "./SignIn.module.css";

const SignIn = () => {
  // Declaring state variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  // For redirection
  const navigate = useNavigate();

  //Retrieving form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Signing users in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      navigate("/");
      console.log("User signed in successfully:", user);
    } catch (error) {
      console.log("Error signing in:", error.message);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <form className={styles.signInForm}>
        <h1>Sign In</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
        </div>
        {/* ------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button className={styles.submitButton} onClick={handleSignIn}>
          Sign In
        </button>
        <p>
          Don´t have an account? Create account{" "}
          <NavLink to="/sign-up">here</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
