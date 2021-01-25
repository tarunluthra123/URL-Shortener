import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from './../contexts/AuthContext';
import '../assets/css/layout.css'
import fire from '../assets/fire.jpg'

const Layout = (props) => {
    const { currentUser, logout } = useAuth()



    return (
       <div className="layout-container">
            <div className="header">
                <span id="logo">
                    <img src={fire} alt='Logo'/>
                </span>
                <nav className="navbar">
                    <span></span>
                    <span className="navlinks">
                        {currentUser &&     <Link to='/'>Dashboard</Link>}
                        {currentUser &&     <a onClick={logout}>Log out</a>}
                        {!currentUser &&    <Link to='/login'>Log in</Link>}
                        {!currentUser &&    <Link to='/signup'>Sign up</Link>}
                    </span>
                </nav>
            </div>
            <section className="body-container container">
                {props.children}
            </section>
       </div>
    )
}

export default Layout;