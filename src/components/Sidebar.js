import React from 'react';
import { AwesomeButton } from 'react-awesome-button';


import '../index.css'
const Sidebar = ({ favorites, removeFavorite }) => {
  return (
    <div className="sidebar">
      <h2 style={{textAlign:"center"}}>Favorite Cities</h2>
      {favorites.length === 0 ? (
        <p>No favorite cities added.</p>
      ) : (
        favorites.map(favorite => (
          <div key={favorite.id} className="sidebar-item">
            <p>{favorite.name}</p>
            <h1>{favorite.temp}{favorite.unit === 'metric' ? '°C' : '°F'}</h1>
            <div className="sidebar-icon">
              <img src={`https://openweathermap.org/img/wn/${favorite.icon}.png`} alt="Weather Icon" />
            </div>
            <AwesomeButton className="remove-button" type="danger" onPress={() => removeFavorite(favorite.id)}>
              {'Remove'}
            </AwesomeButton>
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
