import React from 'react'

export default function Header(props) {
    return (
        <div className="header__container">
            <header className="app__header">
                <h1>{props.text}</h1>
            </header>
        </div>
    )
}
