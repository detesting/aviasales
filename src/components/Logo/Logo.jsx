import React from 'react';

import './Logo.css';
import picture from '../../assets/img/Logo.svg';

export default function Logo() {
  return (
    <div className="logo">
      <img src={picture} alt="Logo company" />
    </div>
  );
}
