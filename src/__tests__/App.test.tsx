import { shallow } from "enzyme";
import React from "react";
import { App } from "../App";

it("mounts without crashing", () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});
