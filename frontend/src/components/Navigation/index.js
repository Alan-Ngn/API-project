import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div>

        <NavLink style={{ textDecoration: 'none', color: 'red' }} exact to="/">
         <i className="fa-brands fa-airbnb fa-rotate-180"></i>
          AlanBnB</NavLink>
      </div>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
