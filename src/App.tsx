import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { AuthProvider } from "./context/AuthContext";

import styles from "./App.module.css";
const App = () => {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
