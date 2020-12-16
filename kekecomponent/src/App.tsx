import React from "react";
import { Menu } from "./component/Menu/menu";
import { MenuItem } from "./component/Menu/menuItem";
import Alert, { Type } from "./component/Alert/alert";
import Button, { ButtonSize, ButtonType } from "./component/Button/button";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>
          click
        </Button>
        <Alert type={Type.Success} />
        <Menu defaultIndex="0" mode="vertical">
          <MenuItem index="0">cool</MenuItem>
          <MenuItem index="1">Aool</MenuItem>
        </Menu>
      </header>
    </div>
  );
};

export default App;
