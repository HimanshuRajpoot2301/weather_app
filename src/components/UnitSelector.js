import React from 'react';
import Select from 'react-select';

const UnitSelector = ({ unitOptions, unit, handleUnitChange }) => (
  <div className="unit-dropdown">
    <Select
      options={unitOptions}
      value={unitOptions.find(option => option.value === unit)}
      onChange={handleUnitChange}
      className="custom-select"
      styles={{
        control: provided => ({
          ...provided,
          backgroundColor: "rgba(0,0,0,0.1)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          borderRadius: "25px",
          padding: ".2rem .5rem",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: "white",
          color: "black",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#ffffff",
        })
      }}
    />
  </div>
);

export default UnitSelector;
