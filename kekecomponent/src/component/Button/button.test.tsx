import React from "react";
import { render } from "@testing-library/react";
import Button from "./button";

/*
 * 1. 记得删掉React自带的testing文件，否则那个文件会被自动执行
 * 2. 记得查看package.json里面的jest-circus，否则运行不了测试
 * */

test("button render", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText("Nice");
  expect(element).toBeTruthy();
});
