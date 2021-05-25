import React from 'react'
import placeholder from '../assets/placeholder.jpg'

const DEFAULT_PLACEHOLDER_IMAGE = placeholder;

export default function Movies({movie, handleImdb}) {
    const imdb = movie.imdbID;

    const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

    const setCurrentImdb = () => {
        handleImdb(imdb);
    }

    return (
        <div className="movies__container">
            <div className="movies__inner">
                <div className="movies__poster">
                    <img alt={`title: ${movie.Title}`} 
                    src={poster}
                    />
                </div>
                <div className="movies__hoverContainer">
                    <div className="movie__top">
                    <h2 className="movies__name">{movie.Title}</h2>
                        <div className="movie__shortInfo">
                            <p className="movie__type">{movie.Type}</p>
                            <p className="movie__year">({movie.Year})</p>
                        </div>
                    </div>       
                    <button className="movie__more" onClick={setCurrentImdb}>More info</button>   
                </div>
            </div>
        </div>
    )
}
