import React from "react";
import { Transition } from "react-transition-group";
import classNames from "classnames";

export enum Type {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
}

interface BaseAlertProps {
  type?: Type;
  description?: React.ReactNode;
  title?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  onClose?: () => void;
  closable?: boolean;
}

const Alert: React.FC<BaseAlertProps> = (props: BaseAlertProps) => {
  const [hide, setHide] = React.useState(false);

  const { type, description, title, onClose, closable } = props;
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
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="alert-desc">{description}</p>}
        {closable && (
          <button className="alert-close" onClick={handleClose} type="button">
            Close
          </button>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: Type.Default,
  title: "Alert",
  description: "This is alert",
  closable: true,
};

export default Alert;
