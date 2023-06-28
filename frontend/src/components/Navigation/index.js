import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useSearch } from '../../context/Search';
import { useLocation } from "react-router-dom";
// import '../../index.css'
function Navigation({ isLoaded }){
  const dispatch = useDispatch()
  const {search, setSearch} = useSearch()
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()



  return (
    <nav>
      <div>

        <NavLink className={'test'} style={{ textDecoration: 'none', color: 'red' }} exact to="/">
          <i className="fa-brands fa-airbnb fa-rotate-180"></i>
          <h1>EarthBnB</h1>
        </NavLink>
      </div>
      {location.pathname === '/' && (

        <div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}></input>
        </div>
      )}
      {isLoaded && (
        <div className='profile-button-user-icon'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
