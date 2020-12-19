import React, { CSSProperties } from "react";
import classNames from "classnames";

/*
 * JSX.Element, ReactNode and ReactElement
 * https://cloud.tencent.com/developer/article/1573512
 * 1. A ReactElement is an object with a type and props.
 * 2. A ReactNode is a ReactElement, a ReactFragment, a string,
 * a number or an array of ReactNodes, or null, or undefined, or a boolean
 * 3. JSX is a global namespace that then gets set by the library, React sets it like this
 * */

export interface TabsItemProps {
  label: string | React.ReactElement;
  disabled: boolean;
  children?: React.ReactNode;
}

const TabsItem: React.FC<TabsItemProps> = (props: TabsItemProps) => {
  const { children } = props;
  return <div className="tab-panel">{children}</div>;
};

TabsItem.defaultProps = {
  label: "Label",
  disabled: false,
  children: () => <li />,
};

export default TabsItem;
