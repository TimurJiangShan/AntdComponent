import React from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index: string;
  // 选项是否被禁用
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index, disabled, className, style, children } = props;
  const { onSelect, index: activeIndex } = React.useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": activeIndex === index,
  });

  const handleClick = () => {
    if (onSelect && !disabled) {
      onSelect(index);
    }
  };

  // 注意a11y的规则
  return (
    <li>
      <div
        className={classes}
        style={style}
        role="button"
        onClick={handleClick}
        onKeyDown={() => {}}
        tabIndex={0}
      >
        {children}
      </div>
    </li>
  );
};

/*
  displayName
  displayName 字符串多用于调试消息。
  通常，你不需要设置它，因为它可以根据函数组件或 class 组件的名称推断出来。
  如果调试时需要显示不同的名称或创建高阶组件，请参阅使用 displayname 轻松进行调试了解更多
* */
MenuItem.displayName = "MenuItem";
export default MenuItem;