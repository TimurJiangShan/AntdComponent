import React from "react";
import Alert, { Type } from "./component/Alert/alert";
import Button, { ButtonSize, ButtonType } from "./component/Button/button";
import { Menu } from "./component/Menu/menu";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>123</div>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>
          click
        </Button>
        <Alert type={Type.Success} />
        <Menu />
      </header>
    </div>
  );
};

export default App;
