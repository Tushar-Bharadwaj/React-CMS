import React from "react";
import { Row, Col, Typography, message } from "antd";
import { AuthorizedRequests } from "utils/AxiosHelper";
import AddNews from "./AddNews";
const { Title } = Typography;

export default class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      genres: null
    };
  }
  toggleStatus = genreId => {
    AuthorizedRequests.put(`/genre/activity/${genreId}`)
      .then(response => {
        console.log(response.data);
        let status = "inactive";
        if (response.data.active) status = "active";
        message.success(`${response.data.name} was set to ${status}.`);
        this.initializeGenre();
      })
      .catch(error => {
        message.error(error.response.data.message);
      });
    console.log(genreId);
  };
  deleteGenre = genreId => {
    AuthorizedRequests.delete(`/genre/${genreId}`)
      .then(response => {
        message.success("Genre Deleted Successfully");
        this.initializeGenre();
      })
      .catch(error => {
        message.error(error.response.data.message);
      });
  };

  render() {
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={2}> Genre Management</Title>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <AddNews />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}></Col>
        </Row>
      </>
    );
  }
}
