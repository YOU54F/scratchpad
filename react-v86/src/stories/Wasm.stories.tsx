import React from "react";
import { Story, Meta } from "@storybook/react";

import { Wasm, WasmProps } from "./Wasm";

export default {
  title: "Example/Wasm",
  component: Wasm,
} as Meta;

const Template: Story<WasmProps> = (args) => <Wasm {...args} />;

export const WasmDefault = Template.bind({});
WasmDefault.args = {};

export const WasmCustomMessage = Template.bind({});
WasmCustomMessage.args = {
  welcomeMessage: "You can set a custom welcome command",
};
