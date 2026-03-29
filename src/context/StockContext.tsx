import { createContext, useState, useContext } from "react";
import type { SymbolData } from "../types/symbol";

type StockContextType = {
  selectedStock: any;
  setSelectedStock: (data: any) => void;
};
const StockContext = createContext<StockContextType>({
  selectedStock: null,
  setSelectedStock: () => {},
});

export const StockProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedStock, setSelectedStock] = useState<SymbolData | null>(null);
  return (
    <StockContext.Provider value={{ selectedStock, setSelectedStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStockContext must be used within a StockProvider");
  }
  return context;
};
