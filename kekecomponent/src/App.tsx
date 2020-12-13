import React from "react";
import Alert, { Type } from "./component/Alert/alert";
import Button, { ButtonSize, ButtonType } from "./component/Button/button";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>123</div>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          click
        </Button>
        <Alert type={Type.Success} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default App;
