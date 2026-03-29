import StocksSearch from "../stocks/StocksSearch";
import StockSummary from "../stocks/StockSummary";
import { StockProvider } from "../../context/StockContext";
import { useAuth } from "../../context/AuthContext";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { state } = useAuth();
  return (
    <StockProvider>
      <main className={styles.main}>
        <section className={styles.section}>
          {state?.user?.name && <h2>Hello, {state?.user?.name}</h2>}
          <StocksSearch />
          <StockSummary />
        </section>
      </main>
    </StockProvider>
  );
};

export default Dashboard;
