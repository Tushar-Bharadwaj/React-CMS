import React from "react";
import { Row, Col, Typography, message } from "antd";
import { AuthorizedRequests } from "utils/AxiosHelper";
import LanguageTable from "./LanguageTable";
import AddLanguage from "./AddLanguage";
const { Title } = Typography;

export default class Language extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      languages: null
    };
  }
  deleteLanguage = languageId => {
    AuthorizedRequests.delete(`/language/${languageId}`)
      .then(response => {
        message.success("Language Deleted Successfully");
        this.initializeLanguage();
      })
      .catch(error => {
        message.error(error.response.data.message);
      });
  };
  initializeLanguage = () => {
    this.setState({ isLoaded: false });
    AuthorizedRequests.get(`/language`)
      .then(response => {
        this.setState({ languages: response.data, isLoaded: true });
      })
      .catch(error => message.error(error));
  };
  componentDidMount() {
    this.initializeLanguage();
  }
  render() {
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={2}> Language Management</Title>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <AddLanguage initializeLanguage={this.initializeLanguage} />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}></Col>
        </Row>
        <LanguageTable
          data={this.state.languages}
          deleteLanguage={this.deleteLanguage}
        />
      </>
    );
  }
}
