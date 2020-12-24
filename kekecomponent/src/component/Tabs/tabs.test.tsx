import React, { CSSProperties } from "react";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react";
import TabsItem from "./tabsItem";
import Tabs, { TabsProps } from "./tabs";

// query* functions will return the element or null if it cannot be found
// get* functions will return the element or throw an error if it cannot be found
const defaultTabsProps: TabsProps = {
  defaultIndex: "1",
  className: "test",
  type: "line",
  onSelect: jest.fn(),
};

const generateTabs = (props: TabsProps) => {
  const { defaultIndex, className, type, onSelect } = props;
  return (
    <Tabs
      type={type}
      defaultIndex={defaultIndex}
      className={className}
      onSelect={onSelect}
    >
      <TabsItem label="tab1">content1</TabsItem>
      <TabsItem label="tab2">content2</TabsItem>
      <TabsItem label="tab3" disabled>
        content3
      </TabsItem>
      <div>123</div>
    </Tabs>
  );
};
let wrapper: RenderResult;
let tabsElement: HTMLElement;

describe("Test Tabs and TabsItem", () => {
  beforeEach(() => {
    wrapper = render(generateTabs(defaultTabsProps));
    tabsElement = wrapper.getByTestId("test-tabs");
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("click render the correct default Tabs", () => {
    const { queryByText, container } = wrapper;
    expect(container.querySelector(".tabs-nav")).toHaveClass("nav-line");
    const activeElement = queryByText("tab2");
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass("is-active");
    expect(queryByText("tab1")).not.toHaveClass("is-active");
    expect(queryByText("content2")).toBeInTheDocument();
    expect(queryByText("content1")).not.toBeInTheDocument();
    expect(tabsElement).toBeInTheDocument();
  });
  it("click tabItem should switch to content", () => {
    const { queryByText, getByText } = wrapper;
    const clickedElement = getByText("tab1");
    fireEvent.click(clickedElement);
    expect(clickedElement).toHaveClass("is-active");
    expect(queryByText("tab2")).not.toHaveClass("is-active");
    expect(queryByText("content1")).toBeInTheDocument();
    expect(queryByText("content2")).not.toBeInTheDocument();
    expect(defaultTabsProps.onSelect).toHaveBeenCalledWith("0");
  });
  it("click disabled tabItem should not work", () => {
    const { getByText } = wrapper;
    const disableElement = getByText("tab3");
    expect(disableElement).toHaveClass("disabled");
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass("active");
    expect(defaultTabsProps.onSelect).not.toHaveBeenCalled();
  });
});
