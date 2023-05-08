import React from 'react';
import './App.css';
import MenuBar from './module/menubar/MenuBar';
import { BrowserRouter } from "react-router-dom";
import TopBar from './module/topbar/TopBar';
import Router from './router/Router';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <MenuBar />
              <TopBar  />
              <Router />
          </BrowserRouter>
      </div>
  );
}

export default App;
