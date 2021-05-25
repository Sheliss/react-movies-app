import React from 'react'

export default function Header({siteName, refreshPage}) {
    return (
        <div className="header__container">
            <header className="app__header">
                <h1 onClick={refreshPage} className="app__name">{siteName}</h1>
            </header>
        </div>
    )
}
