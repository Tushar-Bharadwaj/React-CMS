import React from 'react';
import { Layout, Row, Col } from 'antd';
import Logo from 'assets/images/logo.png';


const { Header, Content, Footer } = Layout;

//Default layout for pages that do not require you to login

export const MainLayout = ({ children }) => {
    return (
        <Layout style={{ height : "100vh" }}>
            <Header style={{ backgroundColor: "transparent"}}>
                <Row type="flex" justify="center" >
                    <Col>
                        <img src={Logo} alt="Logo" height="50px"/>
                    </Col>
                </Row>
            </Header>
                <Layout>
                    <Content>
                        <Row type="flex" justify="center" align="middle">
                            <Col>
                            { children }
                            </Col>
                        </Row>
                    </Content>    
                </Layout>
            <Footer>footer</Footer>
        </Layout>
    );
}