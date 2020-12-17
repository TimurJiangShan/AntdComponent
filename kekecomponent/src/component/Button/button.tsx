import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

//  不仅想自己加Props，还想获得原生的Button的Props属性， such as onClick
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;

type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// Partial 使得里面的属性都变成了可选的（不必实现里面的所有的属性）
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    disabled,
    size,
    btnType,
    children,
    className,
    href,
    ...restProps
  } = props;

  // 假如有用户自定义的className，可以给他添加上去
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }

  // props.children 本质上可以是任何类型，是透明的
  return (
    // eslint-disable-next-line react/button-has-type,react/jsx-props-no-spreading
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
};

export default Button;
