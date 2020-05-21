import React from "react";
import { Table, Button, Switch } from "antd";
import EditGenre from "./EditGenre";
const { Column } = Table;

const GenreTable = ({ data, deleteGenre, toggleStatus, initializeGenre }) => {
  const SwitchStatus = (record) => {
    if (record.active) {
      return <Switch checked={true} onChange={() => toggleStatus(record.id)} />;
    }
    return <Switch checked={false} onChange={() => toggleStatus(record.id)} />;
  };

  return (
    <Table
      size="small"
      dataSource={data.all_the_genres}
      rowKey={(data) => data.id}
    >
      <Column title="id" dataIndex="id" key="key" />
      <Column title="Name" dataIndex="name" />
      <Column
        title="Activate"
        render={(text, record) => <span>{SwitchStatus(record)}</span>}
      />
      <Column
        title="Edit"
        render={(text, record) => (
          <span>
            <EditGenre initializeGenre={initializeGenre} genreId={record.id} />
          </span>
        )}
      />
      <Column
        title="Delete"
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
