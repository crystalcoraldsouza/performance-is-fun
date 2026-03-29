import styles from "./SearchBar.module.css";
type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
};
const SearchBar = ({ value, placeholder, onChange, onFocus }: Props) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={styles.searchBar}
      onFocus={onFocus}
    />
  );
};
export default SearchBar;
