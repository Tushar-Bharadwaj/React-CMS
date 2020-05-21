import React from "react";
import { Row, Col, Typography, message } from "antd";
import { AuthorizedRequests } from "utils/AxiosHelper";
import TagsTable from "./TagsTable";
import AddTags from "./AddTags";
const { Title } = Typography;

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tags: null,
    };
  }
  toggleStatus = (tagId) => {
    AuthorizedRequests.put(`/tag/active/${tagId}`)
      .then((response) => {
        let status = "inactive";
        if (response.data.active) status = "active";
        message.success(`${response.data.name} was set to ${status}.`);
        this.initializeTags();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  deleteTags = (tagId) => {
    AuthorizedRequests.delete(`/tag/${tagId}`)
      .then((response) => {
        message.success("Tags Deleted Successfully");
        this.initializeTags();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  initializeTags = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/tag`)
      .then((response) => {
        this.setState({ tags: response.data.all_the_tags, isLoaded: true });
      })
      .catch((error) => message.error(error));
  };
  componentDidMount() {
    this.initializeTags();
  }
  render() {
    return (
      this.state.isLoaded && (
        <>
          <Row type="flex" justify="space-between">
            <Col span={12}>
              <Title level={2}> Tags Management</Title>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <AddTags initializeTags={this.initializeTags} />
            </Col>
            <Col span={12} style={{ textAlign: "right" }}></Col>
          </Row>
          <TagsTable
            data={this.state.tags}
            toggleStatus={this.toggleStatus}
            deleteTags={this.deleteTags}
            initializeTags={this.initializeTags}
          />
        </>
      )
    );
  }
}
