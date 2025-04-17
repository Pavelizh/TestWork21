import { create } from 'zustand';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../utils/localStorage';
import { getWeatherByCoordinates } from '../api/api';
import { searchCities } from '../api/api';
import debounce from 'lodash/debounce';
import { State } from '../types/store.types';

const useStore = create<State>((set, get) => ({
  query: '',
  results: [],
  favorites: loadFromLocalStorage('favorites', []),
  loading: false,
  error: null,
  showModal: false,
  cityToRemove: null,
  showSuccessMessage: false,
  inputValue: '',

  setQuery: (query) => set({ query }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setResults: (results) => set({ results }),
  setInputValue: (value) => set({ inputValue: value }),

  addToFavorites: async (city) => {
    const { favorites } = get();

    if (
      favorites.some(
        (fav) =>
          fav.name === city.name && fav.lat === city.lat && fav.lon === city.lon
      )
    ) {
      return;
    }

    try {
      const weatherData = await getWeatherByCoordinates(city.lat, city.lon);
      const cityWithWeather = {
        ...city,
        weather: {
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        },
      };

      const newFavorites = [...favorites, cityWithWeather];
      set({ favorites: newFavorites });
      saveToLocalStorage('favorites', newFavorites);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  },

  removeFromFavorites: (cityId: string) => {
    const { favorites } = get();
    const newFavorites = favorites.filter((city) => city.id !== cityId);
    set({ favorites: newFavorites });
    saveToLocalStorage('favorites', newFavorites);
  },

  getCityById: (id: string) => {
    const { favorites } = get();
    return favorites.find((city) => city.id === id);
  },

  reset: () =>
    set({
      query: '',
      results: [],
      loading: false,
      error: null,
    }),

  setShowModal: (showModal) => set({ showModal }),
  setCityToRemove: (cityToRemove) => set({ cityToRemove }),
  setShowSuccessMessage: (showSuccessMessage) => set({ showSuccessMessage }),

  handleRemoveClick: (cityId) => {
    set({ cityToRemove: cityId, showModal: true });
  },

  confirmRemove: () => {
    const {
      cityToRemove,
      removeFromFavorites,
      setShowSuccessMessage,
      setShowModal,
    } = get();
    if (cityToRemove !== null) {
      removeFromFavorites(cityToRemove);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
    setShowModal(false);
  },

  handleSearch: async (query) => {
    if (!query.trim()) {
      set({ results: [] });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await searchCities(query);
      set({ query, results: data });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Неизвестная ошибка' });
      }
    } finally {
      set({ loading: false });
    }
  },

  debouncedSearch: debounce((query) => {
    const { handleSearch } = get();
    handleSearch(query);
  }, 500),
}));

export default useStore;
