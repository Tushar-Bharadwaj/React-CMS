import React from "react";
import { Row, Col, Typography, message } from "antd";
import { AuthorizedRequests } from "utils/AxiosHelper";
import LocalityTable from "./LocalityTable";
import AddLocality from "./AddLocality";
const { Title } = Typography;

export default class Locality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      localitys: null
    };
  }
  deleteLocality = localityId => {
    AuthorizedRequests.delete(`/locality/${localityId}`)
      .then(response => {
        message.success("Locality Deleted Successfully");
        this.initializeLocality();
      })
      .catch(error => {
        message.error(error.response.data.message);
      });
  };
  initializeLocality = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/locality`)
      .then(response => {
        this.setState({ localitys: response.data, isLoaded: true });
      })
      .catch(error => message.error(error));
  };
  componentDidMount() {
    this.initializeLocality();
  }
  render() {
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={2}> Locality Management</Title>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <AddLocality initializeLocality={this.initializeLocality} />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}></Col>
        </Row>
        <LocalityTable
          data={this.state.localitys}
          deleteLocality={this.deleteLocality}
        />
      </>
    );
  }
}
