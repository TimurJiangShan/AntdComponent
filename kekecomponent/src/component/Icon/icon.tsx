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
  | "warning"
  | "danger";

export type SizeProps =
  | "xs"
  | "lg"
  | "sm"
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "9x"
  | "10x"
  | undefined;

interface IconProps {
  theme?: ThemeProps;
  className?: string;
  icon: IconName;
  size?: SizeProps;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { className, theme, icon, size, ...restProps } = props;
  const classes = classNames("icon", className, {
    [`icon-${theme}`]: theme,
  });
  return (
    <FontAwesomeIcon
      icon={icon as IconName}
      className={classes}
      size={size}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
};

Icon.defaultProps = {
  theme: "primary",
  className: "",
  size: "1x",
};

export default Icon;
