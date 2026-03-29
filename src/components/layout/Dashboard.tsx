import StocksSearch from "../../features/stocks/StocksSearch";
import StockSummary from "../../features/stocks/StockSummary";
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
