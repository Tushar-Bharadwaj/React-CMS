import React, { Component } from "react";
import { getAllUsers } from "services/UserService";
import { AuthenticationService } from "services/AuthenticationService";
import { AuthorizedRequests } from "utils/AxiosHelper";
import HomePageTable from "./HomePageTable";
import AddUser from "./AddUser";
import { Row, Col, Typography, message } from "antd";
const { Title } = Typography;

export default class Home extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthenticationService.currentUserValue,
      users: null
    };
  }

  initializeUsers = () => {
    getAllUsers().then(users => {
      let mappedUserList = users.map(user => {
        return {
          key: user.id,
          name: user.name,
          email: user.email
        };
      });
      this.setState({ users: mappedUserList });
    });
  };

  handleDelete = userId => {
    AuthorizedRequests.delete(`/user/${userId}`)
      .then(response => {
        message.success("User Deleted Successfully");
        this.initializeUsers();
      })
      .catch(error => {
        message.error(error.response.data.message);
      });
  };

  componentDidMount() {
    this.initializeUsers();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={2}> User Management</Title>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <AddUser initializeUsers={this.initializeUsers} />
          </Col>
        </Row>
        <HomePageTable data={this.state.users} deleteUser={this.handleDelete} />
      </>
    );
  }
}
