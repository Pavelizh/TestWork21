'use client';

import { ChangeEvent } from 'react';
import useStore from '../../store/store';
import { City } from '../../types/store.types';

const SearchBar: React.FC = () => {
  const {
    inputValue,
    setInputValue,
    debouncedSearch,
    setResults,
  }: {
    inputValue: string;
    setInputValue: (value: string) => void;
    debouncedSearch: (query: string) => void;
    setResults: (results: City[]) => void;
  } = useStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      setResults([]);
    }
  };

  return (
    <input
      className="form-control form-control-lg me-2 mb-3 w-100 border-2 border-info"
      type="search"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Введите название города..."
    />
  );
};

export default SearchBar;
