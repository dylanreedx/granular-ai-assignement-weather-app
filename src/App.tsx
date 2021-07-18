import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { RootState } from "./store";
import Search from "./Components/Search";
import Alert from "./Components/Alert";
import Weather from "./Components/Weather";
import { setAlert } from "./store/actions/alertActions";
import { setError } from "./store/actions/weatherActions";

// components
import Navbar from "./Components/Navbar";

// Styles
import theme from "./theme/";

//pages
import Favorites from "./Pages/Favorites";
import { WeatherType } from "./store/types";

const App: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  const [favorite, setFavorite] = useState(true);
  const favorites: WeatherType[] = [];
  const location = weatherData;

  // Pushing the favorite location into the favorite array
  const addToFavoritesHandler = () => {
    setFavorite(true);
    if (location && favorite && !favorites.find((o) => o === location)) {
      favorites.push(...favorites, location);
    }
    console.log(favorite);
    console.log(favorites);
    return favorites;
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <StyledHome>
                <Search
                  title="Enter your desired city to see the current weather"
                  setFavorite={setFavorite}
                />

                {loading ? (
                  <h2 className="loading-text">Loading...</h2>
                ) : (
                  weatherData && (
                    <Weather
                      data={weatherData}
                      favorite={favorite}
                      onSetFavorite={setFavorite}
                      addToFavoritesHandler={addToFavoritesHandler}
                      favorites={favorites}
                    />
                  )
                )}

                {alertMsg && (
                  <Alert
                    message={alertMsg}
                    onClose={() => dispatch(setAlert(""))}
                  />
                )}

                {error && (
                  <Alert message={error} onClose={() => dispatch(setError())} />
                )}
              </StyledHome>
            </Route>
            <Route path="/favorites">
              {weatherData && (
                <Favorites
                  favorites={favorites}
                  favorite={favorite}
                  data={weatherData}
                  setFavorite={setFavorite}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

const StyledHome = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default App;
