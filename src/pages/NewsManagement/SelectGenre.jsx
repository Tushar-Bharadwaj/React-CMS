import React from "react";
import { Select } from "antd";
const { Option } = Select;

const SelectGenre = () => {
  return (
    <Select mode="multiple" placeholder="Please select favourite colors">
      <Option value="red">Red</Option>
      <Option value="green">Green</Option>
      <Option value="blue">Blue</Option>
    </Select>
  );
};

export default SelectGenre;
