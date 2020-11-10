import React from 'react';
import Hello from './components/Hello';
import MouseTracker from "./components/MouseTracker";
import LikeButton from "./components/LikeButton";
import useMousePosition from "./hooks/useMousePosition";
import logo from './logo.svg';
import './App.css';

function App() {

  const position = useMousePosition();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Hello message={"Hello"} />
          <LikeButton />
          {/*<MouseTracker />*/}
          <p>X: {position.x}, Y: {position.y}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
