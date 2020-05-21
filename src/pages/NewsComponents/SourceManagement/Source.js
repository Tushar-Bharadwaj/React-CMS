import React from "react";
import { Row, Col, Typography, message } from "antd";
import { AuthorizedRequests } from "utils/AxiosHelper";
import SourceTable from "./SourceTable";
import AddSource from "./AddSource";
const { Title } = Typography;

export default class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      sources: null,
    };
  }

  deleteSource = (sourceId) => {
    AuthorizedRequests.delete(`/source/${sourceId}`)
      .then((response) => {
        message.success("Source Deleted Successfully");
        this.initializeSource();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  initializeSource = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/source`)
      .then((response) => {
        this.setState({ sources: response.data, isLoaded: true });
      })
      .catch((error) => message.error(error));
  };
  componentDidMount() {
    this.initializeSource();
  }
  render() {
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={2}> Source Management</Title>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <AddSource initializeSource={this.initializeSource} />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}></Col>
        </Row>
        {this.state.sources && (
          <SourceTable
            data={this.state.sources}
            deleteSource={this.deleteSource}
            initializeSource={this.initializeSource}
          />
        )}
      </>
    );
  }
}
