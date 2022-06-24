import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './404.scss';
const NoMatch = () => {
  return (
    <div className='error-wrapper'>
      <h1 className='error-title'>Oops!</h1>
      <h2 className='error-subtitle'>
        <span>404</span> - page not found
      </h2>
      <p className='error-text'>
        The page you are looking for might have been removed or smth else!:(
      </p>
      <NavLink className='error-link' end to='/'>
        Go to homepage
      </NavLink>
    </div>
  );
};
export default NoMatch;