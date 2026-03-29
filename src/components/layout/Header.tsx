import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";

const Header = () => {
  const { state, dispatch } = useAuth();

  const handleLogin = () => {
    dispatch({
      type: "LOGIN",
      payload: { name: "Jane", email: "jane@gmail.com" },
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.navItems}>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
        {state.isAuthenticated ? (
          <div className={styles.userContainer}>
            <div className={styles.user}>Welcome, {state.user.name}</div>
            <button
              onClick={() => dispatch({ type: "LOGOUT" })}
              className={styles.button}
            >
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
