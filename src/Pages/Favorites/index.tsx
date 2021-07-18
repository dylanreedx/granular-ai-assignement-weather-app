import React, { useState } from "react";
import styled from "styled-components";
import { WeatherType } from "../../store/types";

interface WeatherProps {
  data: WeatherType;
  favorite: boolean;
  favorites: WeatherType[];
  setFavorite: (favorite: boolean) => void;
}

const Favorites: React.FC<WeatherProps> = ({
  data,
  favorite,
  favorites,
  setFavorite,
}) => {
  const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(0);
  const celsius = (data.main.temp - 273.15).toFixed(0);

  const [arr, updateArr] = useState(favorites);

  const removeFavoritesHandler = (e: any) => {
    const name = e.target.getAttribute("name");
    updateArr(arr.filter((location) => location.name !== name));
    setFavorite(!favorite);
  };
  // Mapping the favorite locations
  return (
    <StyledSection>
      <h1 className="title-t">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p> Add locations to favorites! </p>
      ) : (
        favorite &&
        arr?.map((location, id) => {
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

              <button
                className="btn"
                name={location.name}
                onClick={removeFavoritesHandler}
              >
                Remove
              </button>
            </StyledFavoriteCard>
          );
        })
      )}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .title-t {
    font-size: clamp(2em, 6vw, 3em);
  }
`;

const StyledFavoriteCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 5em 0;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }

  img {
    min-width: 10%;
  }

  .info {
    .location-name {
      font-size: 3em;
    }

    .desc {
      font-size: 1.35em;
      padding-bottom: 2em;

      @media only screen and (min-width: 768px) {
        padding-bottom: 0;
      }
    }
  }

  .temp {
    display: flex;
    font-size: 3em;
    gap: 2em;
    padding: 0 2em;
    white-space: nowrap;
    margin-bottom: 2em;

    @media only screen and (min-width: 768px) {
      margin-bottom: 0;
    }
  }

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
`;

export default Favorites;
