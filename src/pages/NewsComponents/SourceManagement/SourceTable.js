import React from "react";
import { Table, Button } from "antd";
const { Column } = Table;

const SourceTable = ({ data, deleteSource, initializeSource }) => {
  return (
    <Table
      size="small"
      dataSource={data.all_the_sources}
      rowKey={(data) => data.id}
    >
      <Column title="id" dataIndex="id" key="key" />
      <Column title="Name" dataIndex="name" />

      <Column
        title="Delete"
        render={(text, record) => (
          <span>
            <Button type="danger" onClick={() => deleteSource(record.id)}>
              Delete
            </Button>
          </span>
        )}
      />
    </Table>
  );
};

export default SourceTable;
