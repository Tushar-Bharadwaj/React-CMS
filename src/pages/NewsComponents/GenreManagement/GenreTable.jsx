import React from "react";
import { Table, Button, Switch } from "antd";
import EditGenre from "./EditGenre";
const { Column } = Table;

const GenreTable = ({ data, deleteGenre, toggleStatus, initializeGenre }) => {
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
            <EditGenre initializeGenre={initializeGenre} genreId={record.id} />
          </span>
        )}
      />
      <Column
        title="Delete"
        key="delete"
        render={(text, record) => (
          <span>
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
