import React from "react";
import { Table, Divider, Button } from "antd";
const { Column } = Table;
const HomePageTable = ({ data, deleteUser }) => {
  return (
    <Table size="small" dataSource={data}>
      <Column title="id" dataIndex="key" key="key" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />

      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <Button type="default">Edit {record.name}</Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => deleteUser(record.key)}>
              Delete
            </Button>
          </span>
        )}
      />
    </Table>
  );
};

export default HomePageTable;
