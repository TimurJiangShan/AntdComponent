import React, { CSSProperties } from "react";
import classNames from "classnames";

type MenuMode = "horizontal" | "vertical";
export interface MenuProps {
  // 默认 active 的菜单项的索引值
  defaultIndex?: string;
  className?: string;
  // 菜单类型， 横向或者纵向
  mode?: MenuMode;
  // ？？？
  style?: CSSProperties;
  // 点击菜单项触发的回调函数
  onSelect?: () => void;
}

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  // children 是什么？？？
  const { className, defaultIndex, mode, style, onSelect } = props;
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });

  return (
    <ul className={className} style={style}>
      <li>1</li>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
};

export default Menu;
