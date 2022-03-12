import React from 'react';

import './App.css';
import Logo from '../Logo';
import Filters from '../Filters';
import Tabs from '../Tabs';
import TicketList from '../TicketList';

export default function App() {
  return (
    <div className="app">
      <Logo />
      <div className="main">
        <Filters />
        <div className="main__list">
          <Tabs />
          <TicketList />
        </div>
      </div>
    </div>
  );
}
