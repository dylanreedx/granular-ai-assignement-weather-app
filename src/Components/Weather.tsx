import React, { useState } from "react";
import { WeatherType } from "../store/types";
import styled from "styled-components";

interface WeatherProps {
  data: WeatherType;
  favorite: boolean;
  onSetFavorite: (favorite: boolean) => void;
  addToFavoritesHandler: () => void;
  favorites: WeatherType[];
}

const Weather: React.FC<WeatherProps> = ({ data, addToFavoritesHandler }) => {
  // Calculated temperatures
  const fahr = (data.main.temp * 1.8 - 459.67).toFixed(0);
  const fahrenheitHigh = (data.main.temp * 1.8 - 459.67 + 5).toFixed(0);
  const fahrenheitLow = (data.main.temp * 1.8 - 459.67 - 4).toFixed(0);
  const cel = (data.main.temp - 273.15).toFixed(0);
  const celsiusHigh = (data.main.temp - 273.15 + 7).toFixed(0);
  const celsiusLow = (data.main.temp - 273.15 - 3).toFixed(0);

  // State handling the toggle between celsius and Fahrenheit.
  const [celsius, setCelsius] = useState(false);

  return (
    <StyledWeather className="data-container">
      <img
        className="weather-icon"
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt="current-quality of the weather"
      />

      <div className="header">
        <div className="main">
          <h1 className="country-name">
            {data.name}, {data.sys.country}
          </h1>
          <div className="btns">
            <button
              className="add-favorite btn"
              onClick={() => addToFavoritesHandler()}
            >
              Add to Favorites
            </button>
            <button className="btn" onClick={() => setCelsius(!celsius)}>
              Switch to {celsius ? "fahrenheit" : "celsius"}
            </button>
          </div>
        </div>
        <p className="weather-desc"> {data.weather[0].description} </p>
      </div>

      <div className="info">
        <div className="temps">
          <h3 className="current-title title-t">Current</h3>
          {!celsius && (
            <div className="far">
              <h2>
                {fahr}
                <sup>&#8457;</sup>
              </h2>
            </div>
          )}
          {celsius && (
            <div className="cel">
              <h2>
                {cel}
                <sup>&#8451;</sup>
              </h2>
            </div>
          )}
        </div>
        <div className="high-low-temp">
          <h3 className="title-t">High & Low Temp</h3>
          {!celsius && (
            <div className="far temp-h-l">
              <h2>
                {" "}
                ⏶{fahrenheitHigh}
                <sup>&#8457;</sup>{" "}
              </h2>
              <h2>
                {" "}
                ⏷{fahrenheitLow}
                <sup>&#8457;</sup>{" "}
              </h2>
            </div>
          )}
          {celsius && (
            <div className="cel temp-h-l">
              <h2>
                {" "}
                ⏶{celsiusHigh}
                <sup>&#8451;</sup>{" "}
              </h2>
              <h2>
                {" "}
                ⏷{celsiusLow}
                <sup>&#8451;</sup>{" "}
              </h2>
            </div>
          )}
        </div>
        <div className="other-info">
          <div className="humidity">
            <h3 className="title-t">Humidity</h3>
            <h2> {data.main.humidity}% </h2>
          </div>
        </div>
      </div>
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
  color: ${(p) => p.theme.colors.primary.textClr};
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn {
    padding: 1em;
    border-radius: 1em;
    cursor: pointer;
    background-color: ${(p) => p.theme.colors.primary.gray};
    border: none;

    &:active {
      background-color: white;
    }
  }

  sup {
    font-family: "Poppins", sans-serif;
  }

  .title-t {
    font-weight: 600;
    font-size: 1.225em;
    white-space: nowrap;
  }

  .weather-icon {
    max-width: 100%;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 0 5em;
    text-align: center;

    .main {
      display: flex;
      flex-direction: column-reverse;
    }

    .country-name {
      font-weight: 600;
      font-size: 1.5em;
    }

    .btns {
      display: flex;
      gap: 1em;
      padding: 1em 0;
    }
  }

  .weather-desc {
    font-size: 1.225em;
    width: 100%;
  }

  .info {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 4em;
    justify-content: center;
    align-items: center;

    @media only screen and (min-width: 768px) {
      flex-direction: row;
    }

    .temps {
      display: flex;
      width: 100%;
      justify-content: space-between;
      text-align: center;
      flex-direction: column;

      h2 {
        font-size: 1.325em;
      }
    }

    .high-low-temp {
      display: flex;
      flex-direction: column;

      .temp-h-l {
        display: flex;
        font-size: 1.325em;
        justify-content: space-between;
        gap: 1em;
      }
    }

    .humidity {
      h2 {
        font-size: 1.325em;
      }
    }
  }
`;

export default Weather;
