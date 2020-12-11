import React from "react";
import "./App.css";
import Button, { ButtonSize, ButtonType } from "./component/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>123</div>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Large}
          href="http://www.baidu.com"
        >
          click
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
