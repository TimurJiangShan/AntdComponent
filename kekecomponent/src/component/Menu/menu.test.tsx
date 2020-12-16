import React, { CSSProperties } from "react";
import { fireEvent, render } from "@testing-library/react";
import Menu, { MenuMode, SelectCallback, MenuProps } from "./menu";
import MenuItem from "./menuItem";

const defaultProps = {
  onSelect: jest.fn(),
};

describe("test Menu and MenuItem component", () => {
  it("should render correct Menu and MenuItem based on default props", () => {
    const wrapper = render(
      <Menu>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <MenuItem index="0" {...defaultProps}>
          Nice
        </MenuItem>
      </Menu>
    );
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("DIV");
  });
  it("click items should change active state and call the right callback", function () {});
  it("should render vertical menu mode when the mode is set to vertical", function () {});
});
