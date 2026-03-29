import { useState, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import { List } from "react-window";
import { type RowComponentProps } from "react-window";
import SearchBar from "../../components/common/SearchBar";
import { stockService } from "../../services/stock.service";
import { useStockContext } from "../../context/StockContext";
import type { SymbolData } from "../../types/symbol";
import { delay } from "../../utils/delay";
import styles from "./StocksSearch.module.css";

type RowData = {
  results: SymbolData[];
  handleSelect: (stock: SymbolData) => void;
};

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div>
      <p>Something went wrong</p>
      <pre>{error instanceof Error ? error.message : "Unknown error"}</pre>
    </div>
  );
};

const StocksSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [results, setResults] = useState<SymbolData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const { setSelectedStock } = useStockContext();
  const autoCompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        autoCompleteRef.current &&
        !autoCompleteRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setShowDropdown(true);
      setLoader(true);
      if (!searchValue) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      try {
        setResults([]);
        await delay(3000);
        console.log("Searching for:", searchValue);
        const response = await stockService.search(searchValue);
        setResults(response);
        setShowDropdown(true);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const handleSearch = async (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (stock: SymbolData) => {
    setSelectedStock(stock);
    setShowDropdown(false);
  };
  const Row = ({
    index,
    style,
    results,
    handleSelect,
  }: RowComponentProps<RowData>) => {
    const item = results[index];

    return (
      <div
        style={style}
        className={styles.autocompleteItem}
        onClick={() => handleSelect(item)}
      >
        <div className={styles.autocompleteItemSymbol}>{item["1. symbol"]}</div>
        <div className={styles.autocompleteItemName}>{item["2. name"]}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SearchBar
          value={searchValue}
          onChange={(value) => handleSearch(value)}
          placeholder="Search Stocks.."
          onFocus={() => setShowDropdown(true)}
        />
        {showDropdown && (
          <div className={styles.autocomplete} ref={autoCompleteRef}>
            {showLoader ? (
              <div className={styles.loader} />
            ) : (
              <List
                className={styles.autocomplete}
                rowComponent={Row}
                rowCount={results.length}
                rowHeight={70}
                rowProps={{ results, handleSelect }}
                overscanCount={0}
              />
            )}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default StocksSearch;
