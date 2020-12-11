import React from "react";
import "./App.css";

import styles from "./css/index.module.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className={styles.red}>123</div>
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
