import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Menu from "./component/Menu/menu";
import MenuItem from "./component/Menu/menuItem";
import SubMenu from "./component/Menu/subMenu";
import Alert, { Type } from "./component/Alert/alert";
import Button from "./component/Button/button";
import Tabs from "./component/Tabs/tabs";
import TabsItem from "./component/Tabs/tabsItem";
import Icon from "./component/Icon/icon";

library.add(fas, fab);

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType="primary" size="lg" disabled>
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
        <Tabs type="card">
          <TabsItem disabled={false} label="Label-1">
            123
          </TabsItem>
          <TabsItem disabled={false} label="Label-2">
            567
          </TabsItem>
          <TabsItem disabled={false} label="Label-2">
            8910
          </TabsItem>
        </Tabs>
        <Icon icon="coffee" theme="danger" size="10x" />
      </header>
    </div>
  );
};

export default App;
