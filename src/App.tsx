import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Outlet } from "react-router-dom";

import styles from "./App.module.css";
const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
