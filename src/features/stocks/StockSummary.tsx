import { useStockContext } from "../../context/StockContext";
import styles from "./StockSummary.module.css";

const StockSummary = () => {
  const { selectedStock } = useStockContext();

  if (!selectedStock) return null;
  return (
    <div className={styles.container}>
      <h2>{selectedStock?.["1. symbol"]}</h2>
      <div className={styles.stockDetails}>
        <p>{selectedStock?.["2. name"]}</p>
        <p>{selectedStock?.["3. type"]}</p>
        <p>{selectedStock?.["4. region"]}</p>
        <p>{selectedStock?.["8. currency"]}</p>
      </div>
    </div>
  );
};

export default StockSummary;
