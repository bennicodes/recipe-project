import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
      console.log("User signed out successfully");
    } catch (error) {
      console.log("Error signing out:", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">Recipes</NavLink>
      <NavLink to="add-recipe">Add Recipes</NavLink>
      {isLoggedIn && (
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
