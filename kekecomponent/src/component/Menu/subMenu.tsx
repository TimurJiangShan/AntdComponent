import React, { CSSProperties } from "react";
import classNames from "classnames";
import MenuItem, { MenuItemProps } from "component/Menu/menuItem";
import { CSSTransition } from "react-transition-group";
import Icon from "../Icon/icon";
import Menu, { MenuContext } from "./menu";

export interface SubMenuProps {
  index?: string;
  className?: string;
  title: string;
  children: React.ReactNode;
}

/*
 * TransitionGroup没有TypeScript定义，所以需要自己安装@type/
 * */

// 当display从none转化成block的时候，其他的动画效果就会完全失效。 因为display不是一个标准的支持animate的属性，所以transition就不起作用
// display和opacity: 1是同时生效的，自然就缺少了变化
/*
  transition 属性不能继承，必须精确的添加到想要的类上
 * 把display: none 注释掉会有动画效果，但是这样opacity仍然占据了空间，不是一个很好的解决方案
 * 采用延时，让display和opacity不同时生效：
 * 1. （渐隐）display: none ==> display: block; opacity: 0; ==> display: block; opacity: 1;
 * 2.  display: block; opacity: 1 ==> display: block; opacity: 0; ==> display: none;
 * */

// 横向菜单要设置 submenu-item的position为relative
const SubMenu: React.FC<SubMenuProps> = (props: SubMenuProps) => {
  const { index, className, title, children } = props;
  const {
    index: activeIndex,
    onSelect,
    mode,
    defaultOpenSubMenus,
  } = React.useContext(MenuContext);
  // 注意这里的mode判断是否应该放在Menu里面，然后通过useContext的方式传进来。

  // defaultOpenSubMenus 有可能是undefined。所以进行判断
  const openSubMenus = defaultOpenSubMenus as Array<string>;
  const openMenus =
    index && mode === "vertical" ? openSubMenus?.includes(index) : false;
  const [menuOpen, setMenuOpen] = React.useState(openMenus);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": activeIndex === index,
    "is-opened": menuOpen,
    "is-vertical": mode === "vertical",
  });

  // 限制children的类型
  /**
   * 1. 用CSS类名拼接的方式来 开启和关闭 subMenu的开关（display: none）
   * 2. 用React.children.map的形式来对子组件进行限制（注意返回克隆元素并添加props）
   * 3. 用 displayName 来进行条件判断
   * 4. 如果想在return的 childElement里面加props，就用React.cloneElement
   * 5. Horizontal 的时候，有hover效果； vertical的时候，是点击效果
   * */
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          // 用这种 index里面套index的形式，实现SubMenu组件也能active的功能
          index: `${index}-${i}`,
        });
      }
      return console.log(
        "Warning: the children element should be MenuItem type"
      );
    });
    const subMenuClasses = classNames("submenu", {
      "menu-opened": menuOpen,
    });
    return (
      <CSSTransition
        in={menuOpen}
        timeout={300}
        classNames="zoom-in-top"
        appear
        unmountOnExit
      >
        <ul className={subMenuClasses} data-testid="test-submenu">
          {childrenComponent}
        </ul>
      </CSSTransition>
    );
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };
  const clickEvents =
    mode === "vertical"
      ? (e: React.MouseEvent) => {
          e.preventDefault();
          setMenuOpen(!menuOpen);
        }
      : () => {};

  const hoverEvents =
    mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  return (
    <li
      key={index}
      className={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...hoverEvents}
    >
      <div
        className="submenu-title"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        style={{ outline: "transparent" }}
        onClick={clickEvents}
      >
        {title}
        <Icon icon="arrow-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.defaultProps = {
  title: "submenu",
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
