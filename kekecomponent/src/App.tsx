import React from "react";
import Button, { ButtonSize, ButtonType } from "./component/Button/button";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>123</div>
        <Button btnType={ButtonType.Default} size={ButtonSize.Small}>
          click
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default App;
