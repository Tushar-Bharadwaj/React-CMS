import React from "react";
import { Layout, Icon } from "antd";
import "./DashboardLayout.style.css";
import SideBar from "./SideBar/SideBar";
const { Header, Sider, Content } = Layout;

class DashboardLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            {!this.state.collapsed ? "DAILYHUNT" : "DH"}
          </div>
          <SideBar />
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              padding: 24,
              background: "#fff",
              height: "100vh"
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardLayout;
