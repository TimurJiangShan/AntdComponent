import React from "react";
import Menu from "./component/Menu/menu";
import MenuItem from "./component/Menu/menuItem";
import SubMenu from "./component/Menu/subMenu";
import Alert, { Type } from "./component/Alert/alert";
import Button, { ButtonSize, ButtonType } from "./component/Button/button";
import Tabs from "./component/Tabs/tabs";
import TabsItem from "./component/Tabs/tabsItem";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled>
          click
        </Button>
        <Alert type={Type.Success} />
        <Menu defaultIndex="0" mode="horizontal" defaultOpenSubMenus={["2"]}>
          <MenuItem>cool</MenuItem>
          <MenuItem>Aool</MenuItem>
          <SubMenu title="Title">
            <MenuItem>SubMenuItem-1</MenuItem>
            <MenuItem>SubMenuItem-2</MenuItem>
          </SubMenu>
          <div>123</div>
        </Menu>
        <Tabs>
          <TabsItem disabled={false} label="Label-1">
            123
          </TabsItem>
        </Tabs>
      </header>
    </div>
  );
};

export default App;
