import React from 'react';
import headerStyles from './header.module.css'
import {NavLink} from "react-router-dom";

const Header = () => {

    return (
        <header className={headerStyles.wrapper}>
            <NavLink
                className={headerStyles.link}
                to="/movies"
            >Movies</NavLink>
            <NavLink className={headerStyles.link} to="/peoples">Peoples</NavLink>
        </header>
    );
};

export default Header;