import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonType, ButtonSize, ButtonProps } from "./button";

// 用 jest.fn() 来创建一个被监控的模拟函数
// 用 Firing Event里面的fireEvent 来触发不同的用户事件
const defaultProps = {
  onClick: jest.fn(),
};

/*
 * 1. 记得删掉React自带的testing文件，否则那个文件会被自动执行
 * 2. 记得查看package.json里面的jest-circus(删掉那一行)，否则运行不了测试
 * */

// 对测试进行分类

describe("test Button", () => {
  it("should render the correct default button", () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument(); // 测试当前元素是否出现在了文档中
    expect(element.tagName).toEqual("BUTTON"); // 测试是否是Button
    expect(element).toHaveClass("btn btn-default"); // 测试类名是否都正确

    /*
     * 1. 先模拟这个element被点击了
     * 2. 再模拟这个被触发的onClick里面的函数是否被调用了
     * */
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", () => {});
  it("should render a link when btnType equals link and href is provided", () => {});
  it("should render disabled button when disabled is true", () => {});
});
