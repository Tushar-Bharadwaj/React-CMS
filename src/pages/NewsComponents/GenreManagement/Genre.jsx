import React from "react";
import { Row, Col, Typography, message } from "antd";
import { AuthorizedRequests } from "utils/AxiosHelper";
import GenreTable from "./GenreTable";
import AddGenre from "./AddGenre";
const { Title } = Typography;

export default class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      genres: null
    };
  }
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
  initializeGenre = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/genre`)
      .then(response => {
        this.setState({ genres: response.data, isLoaded: true });
      })
      .catch(error => message.error(error));
  };
  componentDidMount() {
    this.initializeGenre();
  }
  render() {
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={2}> Genre Management</Title>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <AddGenre initializeGenre={this.initializeGenre} />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}></Col>
        </Row>
        <GenreTable data={this.state.genres} deleteGenre={this.deleteGenre} />
      </>
    );
  }
}
