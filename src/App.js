import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import Game from './component/Game';
import Settings from './component/Settings';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header> */}
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
