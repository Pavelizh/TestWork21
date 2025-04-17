import SearchBar from './components/mainPage/SearchBar';
import CitySearch from './components/mainPage/CitySearch';
import Widget from './components/widget/Widget';
import Popover from './components/popover/Popover';

export default function Page() {
  return (
    <div>
      <div
        className="d-flex align-items-start justify-content-center w-75 mx-auto rounded-4"
        style={{ minHeight: '60vh' }}
      >
        <div className="w-50 mx-auto text-center">
          <h1 className="mb-4">Поиск города</h1>
          <SearchBar />
          <CitySearch />
          <Popover />
        </div>
      </div>
      <Widget />
    </div>
  );
}
