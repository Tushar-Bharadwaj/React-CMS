import React from "react";
import { Table, Button, Switch } from "antd";
import EditLanguage from "./EditLanguage";
const { Column } = Table;

const LanguageTable = ({
  data,
  deleteLanguage,
  toggleStatus,
  initializeLanguage,
}) => {
  const SwitchStatus = (record) => {
    if (record.active) {
      return <Switch checked onChange={() => toggleStatus(record.id)} />;
    }
    return <Switch checked={false} onChange={() => toggleStatus(record.id)} />;
  };

  return (
    <Table size="small" dataSource={data} rowKey={(data) => data.id}>
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
            <EditLanguage
              initializeLanguage={initializeLanguage}
              languageId={record.id}
            />
          </span>
        )}
      />
      <Column
        title="Delete"
        key="delete"
        render={(text, record) => (
          <span>
            <Button type="danger" onClick={() => deleteLanguage(record.id)}>
              Delete
            </Button>
          </span>
        )}
      />
    </Table>
  );
};

export default LanguageTable;
