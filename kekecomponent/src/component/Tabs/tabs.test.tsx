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
};

const generateTabs = (props: TabsProps) => {
  const { defaultIndex, className, type } = props;
  return (
    <Tabs type={type} defaultIndex={defaultIndex} className={className}>
      <TabsItem label="tab1">active</TabsItem>
      <TabsItem label="tab2">disabled</TabsItem>
      <TabsItem label="tab3">normal</TabsItem>
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
  it("should render card types when the props change", () => {
    expect(tabsElement).toBeInTheDocument();
  });
  it("should render", () => {
    expect(tabsElement).toBeInTheDocument();
  });
});
