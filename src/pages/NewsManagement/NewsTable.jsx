import React from "react";
import { Table, Button, Switch } from "antd";
import EditGenre from "./EditGenre";
const { Column } = Table;

const NewsTable = ({ data, deleteNews, toggleStatus, initializeNews }) => {
  const SwitchStatus = record => {
    if (record.active) {
      return <Switch checked onChange={() => toggleStatus(record.id)} />;
    }
    return <Switch checked={false} onChange={() => toggleStatus(record.id)} />;
  };

  return <h1> Hi </h1>;
};

export default NewsTable;
