import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { AuthenticationService } from "services/AuthenticationService";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (AuthenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        AuthenticationService.login(values.email, values.password).then(
          user => {
            const { from } = this.props.location.state || {
              from: { pathname: "/dashboard" }
            };
            this.props.history.push(from);
          },
          error => {
            console.log("Error");
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your Email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
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
    );
  }
}

const Login = Form.create({ name: "login" })(LoginForm);
export default Login;
