import * as React from 'react';
import './App.css';
import { NavBar } from './modules/Navigation/NavBar/NavBar';
import Router from './modules/Routing/Router';


class App extends React.Component {
  public render() {
    return (
      <div>
        <NavBar />
        <Router {...this.props} />
      </div>
    );
  }
}

export default App;
