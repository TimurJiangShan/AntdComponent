import React from "react";
import classNames from "classnames";

enum Type {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
}

interface BaseAlertProps {
  type?: Type;
  description?: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
}

export const Alert: React.FC<BaseAlertProps> = (props: BaseAlertProps) => {
  const [hide, setHide] = React.useState(false);

  const { type, description, title, onClose, closable, ...restProps } = props;
  const classes = classNames("alert", {
    [`alert-${type}`]: type,
  });

  const titleClass = classNames("alert-title", {
    "bold-title": description,
  });

  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };

  return (
    <div className={className}>
      {title}
      {description}
    </div>
  );
};

Alert.defaultProps = {
  type: Type.Default,
  message: "Alert",
  description: "This is alert",
};
