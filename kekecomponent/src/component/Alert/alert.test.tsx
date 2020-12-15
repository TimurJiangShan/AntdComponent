import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert, { BaseAlertProps, Type } from "./alert";

const defaultProps = {
  type: Type.Default,
  description: "12",
  title: "title",
  closable: true,
  onClose: jest.fn(),
};

const successProps = {
  type: Type.Success,
  description: "Desc",
  title: "title-success",
  closable: true,
  onClose: jest.fn(),
};

const disableProps = {
  type: Type.Danger,
  closable: false,
  onClose: jest.fn(),
};
describe("Test Alert", () => {
  it("should render the correct default alert", () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = render(<Alert {...defaultProps} />);
    const element = wrapper.getByText("title");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("SPAN");
    expect(element).toHaveClass("alert-title bold-title");
    expect(wrapper.getByText("12").tagName).toEqual("P");
    fireEvent.click(wrapper.getByText("Close"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = render(<Alert {...successProps} />);
    const element = wrapper.getByText("title-success");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("SPAN");
    expect(element).toHaveClass("alert-title bold-title");
  });
  it("should render correct closeButton disabled alert", () => {
    const { container, getByText, queryByText } = render(
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Alert {...disableProps} />
    );
    expect(getByText("Alert")).toHaveClass("bold-title");
    // 不要用querySelector, 因为这个是bad practice
    expect(container.querySelector(".alert")).toHaveClass("alert alert-danger");
    expect(queryByText("Close")).not.toBeInTheDocument();
  });
});
