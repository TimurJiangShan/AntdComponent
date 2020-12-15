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

export const Menu: React.FC<MenuProps> = () => {
  return (
    <ul>
      <li>1</li>
    </ul>
  );
};
