import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';

const Search = ({ location, setLocation, searchLocation, handleSearch, addFavorite }) => (
  <div className="search">
    <input
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder="Search Location"
      type="text"
    />
    <AwesomeButton style={{ marginLeft: '1rem' }} type="danger" onPress={() => handleSearch()}>
      {'Search'}
    </AwesomeButton>
    <AwesomeButton style={{ marginLeft: '1rem' }} type="primary" onPress={() => addFavorite()}>
      {'Add to Favorites'}
    </AwesomeButton>
  </div>
);

export default Search;
