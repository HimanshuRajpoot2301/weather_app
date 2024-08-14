import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./components/Alert";
import 'react-awesome-button/dist/styles.css';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import WeatherInfo from './components/WeatherInfo';
import UnitSelector from './components/UnitSelector';
import LoadingSpinner from './components/LoadingSpinner';

const FAVORITES_URL = 'https://server-fav.onrender.com/favorites';

function App() {
  const API_KEY = 'be0485b995f6ea88cf7443cab7743963';

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');
  const [symbol, setSymbol] = useState('°C');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(FAVORITES_URL).then(response => {
      setFavorites(response.data);
    }).catch(error => {
      setError('Failed to fetch favorite cities.');
    });
  }, []);

  const handleUnitChange = (selectedOption) => {
    setUnit(selectedOption.value);
    setSymbol(selectedOption.value === 'metric' ? '°C' : '°F');
    setData(null);
  };

  const unitOptions = [
    { value: 'metric', label: 'Celsius (°C)' },
    { value: 'imperial', label: 'Fahrenheit (°F)' },
  ];

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`;

  const handleSearch = () => {
    setIsLoading(true);
    axios.get(url).then(response => {
      setData(response?.data);
      localStorage.setItem('lastSearchedCity', location);
    })
      .catch((error) => {
        setError(error.response?.data?.message || 'An error occurred');
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
        setLocation('');
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const addFavorite = () => {
    if (data) {
      axios.post(FAVORITES_URL, {
        name: data.name,
        weather: data.weather[0].main,
        temp: data.main.temp.toFixed(),
        icon: data.weather[0].icon,
        unit
      }).then(response => {
        setFavorites([...favorites, response.data]);
        setData(null);
      }).catch(error => {
        setError('Failed to add to favorites.');
      });
    }
  };

  const removeFavorite = (id) => {
    axios.delete(`${FAVORITES_URL}/${id}`).then(() => {
      setFavorites(favorites.filter(fav => fav.id !== id));
    }).catch(error => {
      setError('Failed to remove from favorites.');
    });
  };

  return (
    <div className="app">
      <LoadingSpinner isLoading={isLoading} />
      {error && (
        <Alert
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      <div className="main-content">
        <Search 
          location={location} 
          setLocation={setLocation} 
          searchLocation={searchLocation} 
          handleSearch={handleSearch}
          addFavorite={addFavorite}
        />
        <div className="date">
          <p>{new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        {data && <WeatherInfo data={data} symbol={symbol} />}
        <UnitSelector unitOptions={unitOptions} unit={unit} handleUnitChange={handleUnitChange} />
      </div>
      <Sidebar favorites={favorites} removeFavorite={removeFavorite} />
    </div>
  );
}

export default App;