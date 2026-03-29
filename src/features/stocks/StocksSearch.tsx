import { useState, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import SearchBar from "../../components/common/SearchBar";
import { stockService } from "../../services/stock.service";
import { useStockContext } from "../../context/StockContext";
import type { SymbolData } from "../../types/symbol";
import styles from "./StocksSearch.module.css";

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
      if (!searchValue) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      try {
        console.log("Searching for:", searchValue);
        const response = await stockService.search(searchValue);
        setResults(response);
        setShowDropdown(true);
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
    console.log("Value:", value);
  };

  const handleSelect = (stock: SymbolData) => {
    setSelectedStock(stock);
    setShowDropdown(false);
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
        {showDropdown && results.length > 0 && (
          <div className={styles.autocomplete} ref={autoCompleteRef}>
            {results?.map((item: any) => (
              <div
                className={styles.autocompleteItem}
                key={item["1. symbol"]}
                onClick={() => handleSelect(item)}
              >
                <div className={styles.autocompleteItemSymbol}>
                  {item["1. symbol"]}
                </div>
                <div className={styles.autocompleteItemName}>
                  {item["2. name"]}
                </div>
              </div>
            ))}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default StocksSearch;
