import React, { CSSProperties } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library, IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning";

interface IconProps {
  theme?: ThemeProps;
  className?: string;
  icon: IconName;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { className, theme, icon, ...restProps } = props;
  const classes = classNames("icon", className, {
    [`icon-${theme}`]: theme,
  });
  return (
    <FontAwesomeIcon
      icon={icon as IconName}
      className={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
};

Icon.defaultProps = {
  theme: "primary",
  className: "",
};

export default Icon;
