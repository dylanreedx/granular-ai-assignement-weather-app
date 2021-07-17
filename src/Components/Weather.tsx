import React from "react";
import { WeatherType } from "../store/types";
import styled from "styled-components";

interface WeatherProps {
  data: WeatherType;
  favorite: boolean;
  onSetFavorite: (favorite: boolean) => void;
  addToFavoritesHandler: () => void;
  favorites: WeatherType[];
}

const Weather: React.FC<WeatherProps> = ({
  data,
  favorite,
  onSetFavorite,
  addToFavoritesHandler,
}) => {
  const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(0);
  const celsius = (data.main.temp - 273.15).toFixed(0);

  return (
    <StyledWeather className="data-container">
      <img
        className="weather-icon"
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt="current-quality of the weather"
      />

      <div className="header">
        <h1 className="country-name">
          {data.name}, {data.sys.country}
        </h1>
        <button
          className="add-favorite"
          onClick={() => addToFavoritesHandler()}
        >
          Add to Favorites
        </button>
      </div>

      <p className="weather-desc"> {data.weather[0].description} </p>
      <div className="temps">
        <h2>
          {fahrenheit}
          <sup>&#8457;</sup>
        </h2>
        <h2>
          {celsius}
          <sup>&#8451;</sup>
        </h2>
      </div>
      <div className="other-info"></div>
    </StyledWeather>
  );
};

const StyledWeather = styled.section`
  font-family: "Poppins", sans-serif;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  padding: 5em;
  margin: 5em 0;
  border-radius: 2em;

  .weather-icon {
    width: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1em;

    .country-name {
      font-weight: 600;
      font-size: 2em;
    }

    .add-favorite {
      padding: 1em;
      border-radius: 1em;
      cursor: pointer;
      background-color: #eee;
      border: solid #eee;

      &:active {
        background-color: white;
      }
    }
  }

  .weather-desc {
    font-size: 1.225em;
  }

  .temps {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1em 0;
    font-size: 1.325em;
  }
`;

export default Weather;
