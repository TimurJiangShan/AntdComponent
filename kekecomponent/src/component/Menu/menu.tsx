import React, { CSSProperties } from "react";
import classNames from "classnames";
// eslint-disable-next-line import/no-cycle
import { MenuItemProps } from "./menuItem";

export type MenuMode = "horizontal" | "vertical";
export type SelectCallback = (selectIndex: string) => void;
/*
 * 1. MenuItem应该知道现在active的是哪一项，通过这个值来判断高亮哪个项目
 * 2. 父组件的onSelect应该如何把值传递给子组件
 * */

export interface MenuProps {
  // 默认 active 的菜单项的索引值
  defaultIndex?: string;
  className?: string;
  // 菜单类型， 横向或者纵向
  mode?: MenuMode;
  // ？？？
  style?: CSSProperties;
  // 点击菜单项触发的回调函数
  onSelect?: SelectCallback;
  children?: React.ReactNode;
}

interface IMenuContext {
  // 当前选择的index
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
}

export const MenuContext = React.createContext<IMenuContext>({ index: "0" });
const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  // children 是什么？？？
  const { className, defaultIndex, mode, style, onSelect, children } = props;
  // 点击MenuItem会切换selected的状态，并且这个状态有且只有一个，所以用state来存储，指示当前active的是哪一个（在menuItem父组件中）
  const [currentActive, setCurrentActive] = React.useState(defaultIndex);
  const handleClick = (index: string) => {
    setCurrentActive(index);

    // 判断取出来的onSelect是否存在
    if (onSelect) {
      onSelect(index);
    }
  };
  // 创建一个传递给子组件的context
  const passedContext: IMenuContext = {
    index: currentActive || "0",
    onSelect: handleClick,
    mode,
  };

  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });
  // >. 直接子代组合器

  // 限制children的类型
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        /*
         * 以 element 元素为样板克隆并返回新的 React 元素。
         * 返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。
         * 新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留
         * */
        return React.cloneElement(childElement, { index: `${index}` });
      }
      return console.log(
        "Warning: the children element should be MenuItem type"
      );
    });
  };

  return (
    // 这里给ul加上一个 testId， 就可以在测试的时候取到他了 getByTestId
    <ul className={classes} style={style} role="menu" data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
};

export default Menu;
