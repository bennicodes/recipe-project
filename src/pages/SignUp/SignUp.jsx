import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import styles from "./SignUp.module.css";

const SignUp = () => {
  // Declaring state variables
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState(null);

  // For redirecting
  const navigate = useNavigate();

  // Retrieving input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSignUp = async (e, email, password) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up successfully:", user);

      navigate("/");

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <form
        className={styles.signUpForm}
        onSubmit={(e) => handleSignUp(e, formData.email, formData.password)}
      >
        <h1>Sign Up 🌮</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={handleChange}
            value={formData.firstname}
          />
        </div>
        {/* ------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        {/* ------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        {/* ------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </div>
        {/* ------------- */}
        <div className={styles.term}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onChange={handleCheckboxChange}
            checked={formData.terms}
          />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>
        {error && <p>{error}</p>}
        {/* ------------- */}
        <button className={styles.submitButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
