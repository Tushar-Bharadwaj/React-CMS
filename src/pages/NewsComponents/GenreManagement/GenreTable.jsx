import React from "react";
import { Table, Divider, Button } from "antd";
const { Column } = Table;
const GenreTable = ({ data, deleteGenre }) => {
  return (
    <Table size="small" dataSource={data} rowKey={data => data.id}>
      <Column title="id" dataIndex="id" key="key" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => deleteGenre(record.id)}>
              Delete
            </Button>
          </span>
        )}
      />
    </Table>
  );
};

export default GenreTable;
