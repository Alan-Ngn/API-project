import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import '../../index.css'
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div>

        <NavLink className={'test'} style={{ textDecoration: 'none', color: 'red' }} exact to="/">
          <i className="fa-brands fa-airbnb fa-rotate-180"></i>
          <h1>AlanBnB</h1>
        </NavLink>
      </div>
      {isLoaded && (
        <div className='profile-button-user-icon'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
