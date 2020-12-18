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
  const {
    index: activeIndex,
    onSelect,
    mode,
    defaultOpenSubMenus,
  } = React.useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": activeIndex === index,
  });

  // defaultOpenSubMenus 有可能是undefined。
  const openSubMenus = defaultOpenSubMenus as Array<string>;
  const openMenus =
    index && mode === "vertical" ? openSubMenus?.includes(index) : false;

  console.log(`openSubMenus: ${openSubMenus}`);
  console.log(`index: ${index}`);
  // 注意这里的mode判断是否应该放在Menu里面，然后通过useContext的方式传进来。
  const [menuOpen, setMenuOpen] = React.useState(openMenus);

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
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
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

  console.log(openMenus);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li key={index} className={classes} {...hoverEvents}>
      <div
        className="submenu-title"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        style={{ outline: "transparent" }}
        onClick={clickEvents}
      >
        {title}
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
