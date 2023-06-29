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
  const {search, setSearch, spotsArr, setSpotsArr} = useSearch()
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const getSpots = useSelector(state => state.spots)
  const spots = Object.values(getSpots)
  const handleSubmit = (e) => {
    e.preventDefault()
    let filteredSearch = spots.filter(spot => spot.city.toLowerCase().includes(search))
    setSpotsArr(filteredSearch)
  }

  return (
    <nav>
      <div>

        <NavLink className={'test'} style={{ textDecoration: 'none', color: 'red' }} exact to="/">
          {/* <i className="fa-brands fa-airbnb fa-rotate-180"></i> */}
          <img className='dirtbnb' src='dirtbnb.png'/>
          <h1>EarthBnB</h1>
        </NavLink>
      </div>
      {location.pathname === '/' && (
        <form className='search-bar-nav' onSubmit={handleSubmit}>
          <div>

            <div>Where</div>
            <input
            className='search-bar-input'
              value={search}
              placeholder='Search by City'
              onChange={e => setSearch(e.target.value)}/>
          </div>
            <button className='search-bar-button'><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
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
