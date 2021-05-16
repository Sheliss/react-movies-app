import React, { useState } from 'react'

export default function Search({search}) {

    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value);
    };

    const resetInputField = () => {
        setSearchValue('');
    };

    const callSearchFunction = e => {
        e.preventDefault();
        search(searchValue);
        resetInputField();
    }

    return (
        <div className="search__container">
            <form className="search__form">
                <input className="search__input" type="text" value={searchValue} onChange={handleSearchInputChanges} placeholder="Type movie name"></input>
                <input className="search__button" type="submit" value="search" onClick={callSearchFunction}></input>
            </form>
        </div>
    )
}
