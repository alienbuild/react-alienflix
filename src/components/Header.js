import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo.svg";

function Header(){
    return(
        <header>
            <h1><a href="/" id="main-logo">
                <img src={Logo} alt="AlienFlix Logo" width="200"/>
            </a></h1>
        </header>
    )
}

export default Header;