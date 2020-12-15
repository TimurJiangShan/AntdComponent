import React from "react";
import { Transition } from "react-transition-group";
import classNames from "classnames";

export enum Type {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
}

export interface BaseAlertProps {
  /** 类型 四种可选 针对四种不同的场景 */
  type?: Type;
  /** 描述 */
  description?: React.ReactNode;
  /** 标题 */
  title?: React.ReactNode;
  /** 关闭alert时触发的事件 */
  // eslint-disable-next-line react/require-default-props
  onClose?: () => void;
  /** 是否显示关闭图标 */
  closable?: boolean;
}
// 如果后面的props不添加类型，会出现missing props validation
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
    setHide(!hide);
  };

  return (
    <Transition
      in={!hide}
      timeout={300}
      animation="zoom-in-top"
      appear
      unmountOnExit={false}
    >
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
