import React, { CSSProperties } from "react";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const defaultProps: MenuProps = {
  onSelect: jest.fn(),
  defaultIndex: "0",
  className: "test",
};

const verticalProps: MenuProps = {
  onSelect: jest.fn(),
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  const { onSelect, defaultIndex, className, mode } = props;
  return (
    <Menu
      onSelect={onSelect}
      defaultIndex={defaultIndex}
      className={className}
      mode={mode}
    >
      <MenuItem index="0">active</MenuItem>
      <MenuItem disabled index="1">
        disabled
      </MenuItem>
      <MenuItem index="2">normal</MenuItem>
      <div>123</div>
    </Menu>
  );
};

let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;
let normalElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
    normalElement = wrapper.getByText("normal");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active state and call the right callback", () => {
    fireEvent.click(normalElement);
    expect(normalElement).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(defaultProps.onSelect).toHaveBeenCalledWith("2"); // onSelect函数被调用了，并且传入的参数是"2"
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(defaultProps.onSelect).not.toBeCalledWith("1");
  });
  it("should render vertical menu mode when the mode is set to vertical", () => {
    cleanup(); // 清除在beforeEach中已经渲染好的元素。
    const verticalWrapper = render(generateMenu(verticalProps));
    const verticalElement: HTMLElement = verticalWrapper.getByText("active");
    const menuContainer: HTMLElement = verticalWrapper.getByTestId("test-menu");
    expect(verticalElement).toBeInTheDocument();
    expect(menuContainer).toHaveClass("menu-vertical");
  });
});
