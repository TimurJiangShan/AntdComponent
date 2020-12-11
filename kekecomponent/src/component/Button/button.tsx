import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "2s.5rem",
  Small = "1rem",
}

export enum ButtonType {
  Primary = "#0d6efd",
  Default = "#6c757d",
  Danger = "#dc3545",
  Link = "#c04851",
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<BaseButtonProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { disabled, size, btnType, children, href } = props;

  const classes = classNames("btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
};

export default Button;
