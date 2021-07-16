import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setAlert } from "../store/actions/alertActions";
import { getWeather, setLoading } from "../store/actions/weatherActions";

interface SearchProps {
  title: string;
  setFavorite: any;
}

const Search: FC<SearchProps> = ({ title, setFavorite }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === "") {
      return dispatch(setAlert("A city is required to search"));
    }

    setFavorite(false);

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity("");
  };

  return (
    <StyledHeader>
      <div className="caption">
        <p>Curious about the weather anywhere? Check here.</p>
      </div>
      <form onSubmit={submitHandler}>
        <StyledSearch
          type="text"
          placeholder="Search any city, area / postal code, etc."
          value={city}
          onChange={changeHandler}
        />
        <Button>
          <span className="chevron right"></span>
        </Button>
      </form>
    </StyledHeader>
  );
};

const StyledHeader = styled.section`
  width: 100%;
  background-color: #dddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 10em 0 10em;

  padding: 3em 0;

  .caption {
    text-align: center;
    padding: 1em 0;
  }

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledSearch = styled.input`
  padding: 1em;
  outline: gray;
  border: none;
  border-radius: 15em;
  width: 35%;
`;

const Button = styled.button`
  border: none;
  position: relative;
  cursor: pointer;

  .chevron::before {
    border-style: solid;
    border-width: 0.25em 0.25em 0 0;
    content: "";
    display: inline-block;
    height: 0.8em;
    position: absolute;
    top: -0.35em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.8em;
    border-color: gray;
  }

  .chevron.right:before {
    left: -2.5em;
    transform: rotate(45deg);
  }
`;

export default Search;
