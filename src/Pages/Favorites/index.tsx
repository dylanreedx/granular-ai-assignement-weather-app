import React from "react";
import styled from "styled-components";
import { WeatherType } from "../../store/types";

interface WeatherProps {
  data: WeatherType;
  favorite: boolean;
  favorites: WeatherType[];
  removeFavoritesHandler: (location: any) => void;
}

const index: React.FC<WeatherProps> = ({
  data,
  favorite,
  favorites,
  removeFavoritesHandler,
}) => {
  const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(0);
  const celsius = (data.main.temp - 273.15).toFixed(0);

  return (
    <section>
      <h1 style={{ fontSize: "4em" }}>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p> Add locations to favorites! </p>
      ) : (
        favorite &&
        favorites?.map((location, id) => {
          return (
            <StyledFavoriteCard key={id}>
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                alt="current-quality of the weather"
              />
              <div className="info">
                <h2 className="location-name"> {location.name} </h2>
                <h3 className="desc">{location.weather[0].description}</h3>
              </div>
              <div className="temp">
                <h2>
                  {celsius} <sup>&#8451;</sup>
                </h2>
                <h2>
                  {fahrenheit} <sup>&#8457;</sup>
                </h2>
              </div>
              <button onClick={() => removeFavoritesHandler(id)}>Remove</button>
            </StyledFavoriteCard>
          );
        })
      )}
    </section>
  );
};

const StyledFavoriteCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5em 0;
  border-bottom: 1px solid black;

  img {
    min-width: 10%;
  }

  .info {
    .location-name {
      font-size: 3em;
    }

    .desc {
      font-size: 1.35em;
    }
  }

  .temp {
    display: flex;
    font-size: 3em;
    gap: 2em;
    padding: 0 2em;
  }
`;

export default index;
