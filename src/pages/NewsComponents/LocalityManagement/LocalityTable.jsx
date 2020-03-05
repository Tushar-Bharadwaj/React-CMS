import React from "react";
import { Table, Button, Switch } from "antd";
import EditLocality from "./EditLocality";
const { Column } = Table;

const LocalityTable = ({
  data,
  deleteLocality,
  toggleStatus,
  initializeLocality
}) => {
  const SwitchStatus = record => {
    if (record.active) {
      return <Switch checked onChange={() => toggleStatus(record.id)} />;
    }
    return <Switch checked={false} onChange={() => toggleStatus(record.id)} />;
  };

  return (
    <Table size="small" dataSource={data} rowKey={data => data.id}>
      <Column title="id" dataIndex="id" key="key" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Activate"
        key="action"
        render={(text, record) => <span>{SwitchStatus(record)}</span>}
      />
      <Column
        title="Edit"
        key="edit"
        render={(text, record) => (
          <span>
            <EditLocality
              initializeLocality={initializeLocality}
              localityId={record.id}
            />
          </span>
        )}
      />
      <Column
        title="Delete"
        key="delete"
        render={(text, record) => (
          <span>
            <Button type="danger" onClick={() => deleteLocality(record.id)}>
              Delete
            </Button>
          </span>
        )}
      />
    </Table>
  );
};

export default LocalityTable;
