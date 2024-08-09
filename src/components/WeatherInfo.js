import React from 'react';

const WeatherInfo = ({ data, symbol }) => (
  <div className="container">
    <div className="top">
      <div className='location'>
        <p>{data.name}</p>
      </div>
      <div className="temp">
        <h1>{data.main.temp.toFixed()}{symbol}</h1>
        <div className="icon">
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      </div>
      <div className="description">
        <h2>{data.weather[0].main}</h2>
      </div>
    </div>
    <div className="bottom">
      <div className="feels">
        <p className="bold">{data.main.feels_like.toFixed()}{symbol}</p>
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        <p className="bold">{data.main.humidity}%</p>
        <p>Humidity</p>
      </div>
      <div className="temp_max">
        <p className="bold">{data.main.temp_max.toFixed()}{symbol}</p>
        <p>Max Temp</p>
      </div>
      <div className="wind">
        <p className="bold">{data.wind.speed.toFixed()}m/s</p>
        <p>Wind Speed</p>
      </div>
    </div>
  </div>
);

export default WeatherInfo;
