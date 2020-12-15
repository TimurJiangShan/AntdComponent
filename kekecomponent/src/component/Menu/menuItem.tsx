import React from "react";
import classNames from "classnames";

export interface MenuItemProps {
  index?: string;
  // 选项是否被禁用
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index, disabled, className, style } = props;

  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
  });

  const handleClick = () => {
    console.log("Click");
  };

  // 注意a11y的规则
  return (
    <option
      className={classes}
      style={style}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      1
    </option>
  );
};
