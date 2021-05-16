import React, {useReducer, useEffect} from 'react';
import Header from './Header';
import Search from './Search';
import Movies from './Movies';
import {initialState, reducer} from '../Store/reducer';
import axios from 'axios';
import spinner from '../assets/spinner.svg';

const siteName = 'React Movies';
const OMDB_API = '6c6577de';
const RECOMEND_MOVIES = 'iron man';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios.get(`https://www.omdbapi.com/?s=${RECOMEND_MOVIES}&apikey=${OMDB_API}`).then(jsonResponse => {
      if(jsonResponse.data.Response === 'True') {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.data.Search
        });
      }
    });

    return;

  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=${OMDB_API}`).then(
      jsonResponse => {
        if(jsonResponse.data.Response === 'True') {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        }
        if(jsonResponse.data.Response === 'False') {
          dispatch({
            type: "SEARCH_MOVIES_FAIL",
            error: jsonResponse.data.Error
          });
        }
      }
    )
  }

  const {movies, errorMessage, loading} = state;

  const retrivedMovies = 
    loading && !errorMessage ? (
      <object className="loadingContainer" type="image/svg+xml" data={spinner}>SVG dont work :c</object>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
    movies.map((movie, index) => (
      <Movies key={`${index}-${movie}`} movie={movie} />
    )
  ));


  return (
    <div className="App">
      <Header text={siteName}/>
      <Search search={search}/>
      <div className="moviesList__container">{retrivedMovies}</div>
    </div>
  );
}

export default App;
