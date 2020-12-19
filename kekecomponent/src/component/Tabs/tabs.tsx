import React, { CSSProperties, FunctionComponentElement } from "react";
import classNames from "classnames";
import { TabsItemProps } from "./tabsItem";

interface TabsProps {
  /** 当前激活 tab 面板的 index，默认为0 */
  defaultIndex?: string;
  /** 可以扩展的 className */
  className?: string;
  /** 点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: string) => void;
  /** Tabs的样式，两种可选，默认为 line */
  type?: "line" | "card";
  children?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  const { defaultIndex, className, onSelect, type, children } = props;
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex);
  const navClass = classNames("tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });
  const handleClick = (
    e: React.MouseEvent,
    index: string,
    disabled: boolean | undefined
  ) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };

  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabsItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("tabs-nav-item", {
        "is-active": activeIndex === `${index}`,
        disabled,
      });
      const key = `nav-item-${index}`;
      return (
        <li className={classes} key={key}>
          <div
            className={classes}
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
            style={{ outline: "transparent" }}
            onClick={(e) => {
              handleClick(e, `${index}`, disabled);
            }}
          >
            {label}
          </div>
        </li>
      );
    });
  };

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (`${index}` === activeIndex) {
        return child;
      }
      return null;
    });
  };
  return (
    <div className={`tabs ${className}`}>
      <ul className={navClass}>
        <li>{renderNavLinks()}</li>
      </ul>
      <div className="tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: "0",
  type: "line",
};

export default Tabs;
