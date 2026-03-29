import StocksSearch from "../stocks/StocksSearch";
import StockSummary from "../stocks/StockSummary";
import { StockProvider } from "../../context/StockContext";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <StockProvider>
      <main className={styles.main}>
        <section className={styles.section}>
          <StocksSearch />
          <StockSummary />
        </section>
      </main>
    </StockProvider>
  );
};

export default Dashboard;
