import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navigator.css';

export const Navigator = () => {
  return (
    <div className={'navContainer'}>
      <div className={'routesContainer'}>
        <Link to="/share">Compartir</Link>

        <Link to="/management">Gestión </Link>
      </div>
    </div>
  );
};
