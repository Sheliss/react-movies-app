import React from 'react';
import placeholder from '../assets/placeholder.jpg'

const DEFAULT_PLACEHOLDER_IMAGE = placeholder;

export default function Description({handleClose, movieDetails, clickStopPropagation}) {

    const poster = movieDetails.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movieDetails.Poster;

    return (
        <div onClick={(e) => clickStopPropagation(e)} className="popup__inner infoContent">
            <div className="infoContent__leftSide">
                <div className="infoContent__poster">
                    <img alt={`title: ${movieDetails.Title}`} 
                        src={poster}
                    />
                </div>
                <div className="infoContent__rating rating">
                    <div className="rating__inner">
                        <div className="rating_title">IMDb Rating</div>
                        <div className="rating__score">{movieDetails.imdbRating} / 10</div>
                        <div className="rating__votes">{movieDetails.imdbVotes} votes</div>
                    </div>
                </div>
            </div>
            <div className="infoContent__rightSide">
                <h2 className="infoContent__title">{movieDetails.Title}</h2>
                <div className="infoContent__genre">{movieDetails.Genre}</div>
                <div className="infoContent__subtitle">
                    <div className="infoContent__ageRating">{movieDetails.Rated}</div>
                    <span className="infoContent__ghostDivide">|</span>
                    <div className="infoContent__runtime">{movieDetails.Runtime}</div>
                    <span className="infoContent__ghostDivide">|</span>
                    <div className="infoContent__year">{movieDetails.Year}</div>
                </div>
                <p className="infoContent__plot">{movieDetails.Plot}</p>
            </div>
            <div className="infoContent__close" onClick={handleClose}></div>
        </div>
    )
}
