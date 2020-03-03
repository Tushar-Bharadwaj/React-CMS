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
      tagss: null
    };
  }
  deleteTags = tagsId => {
    AuthorizedRequests.delete(`/tag/${tagsId}`)
      .then(response => {
        message.success("Tags Deleted Successfully");
        this.initializeTags();
      })
      .catch(error => {
        message.error(error.response.data.message);
      });
  };
  initializeTags = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/tag`)
      .then(response => {
        this.setState({ tagss: response.data, isLoaded: true });
      })
      .catch(error => message.error(error));
  };
  componentDidMount() {
    this.initializeTags();
  }
  render() {
    return (
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
        <TagsTable data={this.state.tagss} deleteTags={this.deleteTags} />
      </>
    );
  }
}
