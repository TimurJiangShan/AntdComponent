import React, { CSSProperties } from "react";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const defaultProps: MenuProps = {
  onSelect: jest.fn(),
  defaultIndex: "0",
  className: "test",
  mode: "horizontal",
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
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>normal</MenuItem>
      <SubMenu title="Submenu">
        <MenuItem>sub1</MenuItem>
        <MenuItem>sub2</MenuItem>
      </SubMenu>
      <div>123</div>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
    .menu-item {
      display: none;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerText = cssFile;
  return style;
};

let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;
let normalElement: HTMLElement;
let subMenuElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
    normalElement = wrapper.getByText("normal");
    subMenuElement = wrapper.getByText("Submenu");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    // 当需要获取已检索到的的直接后代元素时，:scope 伪类很有用。 获取第一级的元素个数
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
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

  // 注意这里是异步的
  it("should show dropdown menus when hover on subMenu", async () => {
    expect(subMenuElement).toBeInTheDocument();
    expect(wrapper.getByTestId("test-submenu")).toHaveClass("submenu");
    // 这里会返回true，因为test文件没有把css引入，会展示所有的
    // expect(wrapper.queryByText("sub1")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("Submenu");
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("sub1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("sub1"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith("3-0");
  });
});
