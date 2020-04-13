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

  initializeNews = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/news`)
      .then(response => {
        console.log(response.data);
        this.setState({ news: response.data, isLoaded: true });
      })
      .catch(error => message.error(error));
  };
  toggleStatus = newsId => {
    //Set Trending Or Not Trending Depending On Current Value
  };
  deleteGenre = newsId => {
    AuthorizedRequests.delete(`/news/${newsId}`)
      .then(response => {
        message.success("News Deleted Successfully");
        this.initializeNews();
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
