import React from "react";
import { Form, Icon, Input, Button, Card, message } from "antd";
import { AuthenticationService } from "services/AuthenticationService";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    if (AuthenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        AuthenticationService.login(values.email, values.password).then(
          user => {
            const { from } = this.props.location.state || {
              from: { pathname: "/home" }
            };
            this.props.history.push(from);
          },
          error => {
            console.log("error");
            message.error("Invalid Credentials");
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        title="Login Page"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                autoComplete="on"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(LoginPage);
export default Login;
