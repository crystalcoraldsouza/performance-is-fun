import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";

import styles from "./App.module.css";
const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Layout />
      <Footer />
    </div>
  );
};

export default App;
