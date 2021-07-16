export const GET_WEATHER = "GET_WEATHER";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_ALERT = "SET_ALERT";

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherType {
  base: string;
  name: string;
  weather: Weather[];
  sys: {
    country: string;
  };
  main: {
    temp: number;
    min_temp: number;
    max_temp: number;
    humidity: number;
  };
  id: number;
}

export interface WeatherError {
  cod: string;
  message: string;
}

export interface WeatherState {
  data: WeatherType | null;
  loading: boolean;
  error: string;
}

interface GetWeatherAction {
  type: typeof GET_WEATHER;
  payload: WeatherType;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type WeatherAction =
  | GetWeatherAction
  | SetLoadingAction
  | SetErrorAction;

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export interface AlertState {
  message: string;
}
