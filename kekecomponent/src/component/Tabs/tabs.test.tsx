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
      <TabsItem label="tab3">content3</TabsItem>
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
  it("click tabItem should switch to content'", () => {
    expect(tabsElement).toBeInTheDocument();
  });
  it("should render", () => {
    const { queryByText, getByText } = wrapper;
    const clickedElement = getByText("tab1");
    fireEvent.click(clickedElement);
    expect(clickedElement).toHaveClass("is-active");
    expect(queryByText("tab2")).not.toHaveClass("is-active");
    expect(queryByText("content1")).toBeInTheDocument();
    expect(queryByText("content2")).not.toBeInTheDocument();
    expect(defaultTabsProps.onSelect).toHaveBeenCalledWith("0");
  });
  // eslint-disable-next-line jest/expect-expect
  it("should render necessary", () => {});
});
