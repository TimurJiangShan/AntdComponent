import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
  classNames?: string;
  children: React.ReactNode;
  unmountOnExit?: boolean;
  appear?: boolean;
};

const Transition: React.FC<TransitionProps> = (props: TransitionProps) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CSSTransition classNames={classNames || animation} {...restProps}>
      {wrapper ? <div>{children}</div> : { children }}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
  animation: "zoom-in-top",
  wrapper: true,
  classNames: "",
};

export default Transition;
