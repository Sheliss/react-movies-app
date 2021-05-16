import React from 'react'
import placeholder from '../assets/placeholder.jpg'

const DEFAULT_PLACEHOLDER_IMAGE = placeholder;

export default function Movies({movie}) {
    const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

    return (
        <div className="movies__container">
            <div className="movies__inner">
                <div className="movies__poster">
                    <img alt={`title: ${movie.Title}`} 
                    src={poster}
                    />
                </div>
                <div className="movies__hoverContainer">
                    <h2 className="movies__name">{movie.Title}</h2>
                    <p className="movie__year">{movie.Year}</p>
                </div>
            </div>
        </div>
    )
}
