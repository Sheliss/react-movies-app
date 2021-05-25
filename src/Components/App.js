import React, {useReducer, useEffect} from 'react';
import Header from './Header';
import Search from './Search';
import Movies from './Movies';
import Description from './Description';
import {initialState, reducer} from '../Store/reducer';
import axios from 'axios';
import spinner from '../assets/spinner.svg';
import spinnerWhite from '../assets/spinner-white.svg';

const siteName = 'React Movies App';
const OMDB_API = '6c6577de';
const RECOMEND_MOVIES = ['Dragon ball', 'One piece'];

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    const currentRecomendedMovie = RECOMEND_MOVIES[Random(RECOMEND_MOVIES)];

    axios.get(`https://www.omdbapi.com/?s=${currentRecomendedMovie}&apikey=${OMDB_API}`).then(jsonResponse => {
      if(jsonResponse.data.Response === 'True') {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.data.Search
        });
      }
    });

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

  const searchImdb = imdb => {
    dispatch({
      type: "DETAIL_MOVIE_REQEST"
    });

    axios(`https://www.omdbapi.com/?i=${imdb}&apikey=${OMDB_API}&plot=full`).then(
      jsonResponse => {
        if(jsonResponse.data.Response === 'True') {
          console.log(jsonResponse.data)
          dispatch({
            type: "DETAIL_MOVIE_SUCCESS",
            payload: jsonResponse.data
          });
        }
      }
    )
  }

  const refreshPage = () => {
    window.location.reload();
  };
  
  const clickStopPropagation = (e) => {
    e.stopPropagation();
    return;
  }
  
  const handleClose = () => {
    dispatch({
      type: "POPUP__CLOSE"
    })
  }

  const {movies, errorMessage, loading, showPopup, popupLoading, movieDetails, movieDetailsError} = state;


  const retrivedMovies = 
    loading && !errorMessage ? (
      <object className="loadingContainer" type="image/svg+xml" data={spinner}>SVG dont work :c</object>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
    movies.map((movie, index) => (
      <Movies key={`${index}-${movie}`} movie={movie} handleImdb={searchImdb} />
    )
  ));

  const currentMoviePopup = 
        popupLoading && !movieDetailsError ? (
            <object className="popup__loadingContainer" type="image/svg+xml" data={spinnerWhite}>SVG dont work :c</object>
        ) : movieDetailsError ? (
            <div className="popup__errorMessage">{movieDetailsError}</div>
        ) : (
            <Description movieDetails={movieDetails} clickStopPropagation={clickStopPropagation} handleClose={handleClose}/>
        )

  return (
      <div className="App">
        <Header siteName={siteName} refreshPage={refreshPage}/>
        <div className="app__wrapper">
          <Search search={search}/>
          <div className="moviesList__container">{retrivedMovies}</div>
          {showPopup && <div className="popup__container" onClick={handleClose}>{currentMoviePopup}</div>}
        </div>
    </div>
  );
}


function Random(arr) {

  const random = Math.floor(Math.random() * arr.length);

  return random;
}


export default App;
