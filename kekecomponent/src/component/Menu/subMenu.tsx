import React, { CSSProperties } from "react";
import classNames from "classnames";
import MenuItem, { MenuItemProps } from "component/Menu/menuItem";
import Menu, { MenuContext } from "./menu";

export interface SubMenuProps {
  index?: string;
  className?: string;
  title: string;
  children: React.ReactNode;
}

// 横向菜单要设置 submenu-item的position为relative
const SubMenu: React.FC<SubMenuProps> = (props: SubMenuProps) => {
  const { index, className, title, children } = props;
  const { index: activeIndex, onSelect } = React.useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": activeIndex === index,
  });

  // 限制children的类型
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return childElement;
      }
      return console.log(
        "Warning: the children element should be MenuItem type"
      );
    });
    return <ul className="submenu">{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.defaultProps = {
  title: "submenu",
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
