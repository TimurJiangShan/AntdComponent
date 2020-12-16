import React, { CSSProperties } from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import Menu, { MenuMode, SelectCallback, MenuProps } from "./menu";
import MenuItem from "./menuItem";

const defaultProps: MenuProps = {
  onSelect: jest.fn(),
  defaultIndex: "0",
  className: "test",
};

const generateMenu = (props: MenuProps) => {
  const { onSelect, defaultIndex, className } = props;
  return (
    <Menu onSelect={onSelect} defaultIndex={defaultIndex} className={className}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem disabled index="1">
        disabled
      </MenuItem>
      <MenuItem index="2">normal</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
});

it("click items should change active state and call the right callback", function () {});
it("should render vertical menu mode when the mode is set to vertical", () => {});
