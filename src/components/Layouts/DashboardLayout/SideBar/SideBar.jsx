import React from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import { AuthenticationService } from "services/AuthenticationService";
import { AuthorizedRequests } from "utils/AxiosHelper";
import hasRole from "../../../../utils/CheckRoles";

const { SubMenu } = Menu;

class SideBar extends React.Component {
  logout = () => {
    AuthenticationService.logout();
    this.props.history.push("/");
  };
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    AuthorizedRequests.get(`/user/info`)
      .then((response) => {
        this.setState({
          currentUser: response.data,
          isLoaded: true,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (this.state.isLoaded) {
      var { currentUser } = this.state;
    }
    return (
      <>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home Page</span>
            <Link to="/home" />
          </Menu.Item>
          {this.state.isLoaded &&
            hasRole(this.state.currentUser, ["ROLE_ADMIN"]) && (
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="code" />
                    <span>Componenets</span>
                  </span>
                }
              >
                <Menu.Item key="2">
                  <Icon type="number" />
                  <span>Tags</span>
                  <Link to="/tags" />
                </Menu.Item>

                <Menu.Item key="3">
                  <Icon type="book" />
                  <span>Language</span>
                  <Link to="/language" />
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="environment" />
                  <span>Locality</span>
                  <Link to="/locality" />
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="experiment" />
                  <span>Genre</span>
                  <Link to="/genre" />
                </Menu.Item>
                <Menu.Item key="10">
                  <Icon type="environment" />
                  <span>Source</span>
                  <Link to="/source" />
                </Menu.Item>
              </SubMenu>
            )}
          <Menu.Item key="6">
            <Icon type="upload" />
            <span>News</span>
            <Link to="/news" />
          </Menu.Item>
          {currentUser && (
            <Menu.Item key="7" onClick={this.logout}>
              <Icon type="experiment" />
              <span>Logout</span>
            </Menu.Item>
          )}
        </Menu>
        )}
      </>
    );
  }
}

export default withRouter(SideBar);
