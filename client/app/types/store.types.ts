export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
  weather?: {
    temperature: number;
    description: string;
    icon: string;
  };
  state?: string;
  country?: string;
}

export interface State {
  query: string;
  results: City[];
  favorites: City[];
  loading: boolean;
  error: string | null;
  showModal: boolean;
  cityToRemove: string | null;
  showSuccessMessage: boolean;
  inputValue: string;
  debouncedSearch: (query: string) => void;

  setQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setResults: (results: City[]) => void;
  setInputValue: (value: string) => void;

  addToFavorites: (city: City) => Promise<void>;
  removeFromFavorites: (cityId: string) => void;
  getCityById: (id: string) => City | undefined;
  reset: () => void;
  setShowModal: (showModal: boolean) => void;
  setCityToRemove: (cityToRemove: string | null) => void;
  setShowSuccessMessage: (showSuccessMessage: boolean) => void;
  handleRemoveClick: (cityId: string) => void;
  confirmRemove: () => void;
  handleSearch: (query: string) => Promise<void>;
}
