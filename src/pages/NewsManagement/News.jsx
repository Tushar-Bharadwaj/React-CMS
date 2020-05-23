import React from "react";
import { Row, Col, Typography, message } from "antd";
import { AuthorizedRequests } from "utils/AxiosHelper";
import AddNews from "./AddNews";
import NewsTable from "./NewsTable";
const { Title } = Typography;

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      news: null,
    };
  }

  initializeNews = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/auth/news`)
      .then((response) => {
        console.log(response.data);
        this.setState({ news: response.data, isLoaded: true });
      })
      .catch((error) => message.error(error));
  };
  toggleTrending = (newsId) => {
    AuthorizedRequests.post(`/auth/news/updateTrending/${newsId}`)
      .then((response) => {
        message.success(`${response.data}`);
        this.initializeNews();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  togglePublished = (newsId) => {
    AuthorizedRequests.post(`/auth/news/updatePublished/${newsId}`)
      .then((response) => {
        message.success(`${response.data}`);
        this.initializeNews();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  deleteNews = (newsId) => {
    AuthorizedRequests.delete(`/auth/news/${newsId}`)
      .then((response) => {
        message.success("News Deleted Successfully");
        this.initializeNews();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  componentDidMount() {
    this.initializeNews();
  }

  render() {
    return (
      this.state.isLoaded && (
        <>
          <Row type="flex" justify="space-between">
            <Col span={12}>
              <Title level={2}> News Management</Title>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <AddNews />
            </Col>
            <Col span={12} style={{ textAlign: "right" }}></Col>
          </Row>
          <NewsTable
            data={this.state.news}
            toggleTrending={this.toggleTrending}
            deleteNews={this.deleteNews}
            initializeNews={this.initializeNews}
            togglePublished={this.togglePublished}
          />
        </>
      )
    );
  }
}
