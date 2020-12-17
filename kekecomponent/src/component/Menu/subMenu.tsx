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
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { index, className, title, children } = props;
  const { index: activeIndex, onSelect, mode } = React.useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": activeIndex === index,
  });

  // 限制children的类型
  /**
   * 1. 用CSS类名拼接的方式来 开启和关闭 subMenu的开关（display: none）
   * 2. 用React.children.map的形式来对子组件进行限制
   * 3. 用 displayName 来进行条件判断
   * 4. 如果想在return的 childElement里面加props，就用React.cloneElement
   * 5. Horizontal 的时候，有hover效果； vertical的时候，是点击效果
   * */
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
    const subMenuClasses = classNames("submenu", {
      "menu-opened": menuOpen,
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toogle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toogle);
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
  console.log(mode);
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
