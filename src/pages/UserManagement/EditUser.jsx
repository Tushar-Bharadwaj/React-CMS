import React from "react";
import "./user.style.css";
import { AuthorizedRequests } from "utils/AxiosHelper";

import { Button, Modal, Form, Input, Radio, message } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible,
        onCancel,
        onCreate,
        form,
        name,
        role,
        email
      } = this.props;
      const { getFieldDecorator } = form;
      console.log(role);
      return (
        <Modal
          visible={visible}
          title="Create A New User"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Please Enter Name!" }],
                initialValue: name
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please Enter Email!" }],
                initialValue: email
              })(<Input />)}
            </Form.Item>

            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator("role", {
                rules: [{ required: true, message: "Please Enter A Role!" }],
                initialValue: role[0].name
              })(
                <Radio.Group>
                  <Radio value="ADMIN">Admin</Radio>
                  <Radio value="CONTENT_MODERATOR">Content Moderator</Radio>
                  <Radio value="CONTENT_CREATOR">Content Creator</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "",
      email: "",
      role: "",
      isLoaded: false
    };
  }

  showModal = () => {
    AuthorizedRequests.get(`/user/${this.props.userId}`)
      .then(response => {
        console.log(response);
        this.setState({
          name: response.data.name,
          email: response.data.email,
          roles: response.data.roles,
          isLoaded: true,
          visible: true
        });
      })
      .catch(error => {
        message.error(error.response.data.message);
      });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  componentDidMount() {}
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return "";
      }
      AuthorizedRequests.post("/user/create", {
        name: values.name,
        email: values.email,
        role: [values.role],
        password: values.password
      })
        .then(response => {
          message.success("User Created Successfully");
          form.resetFields();
          this.props.initializeUsers();
          this.setState({ visible: false });
        })
        .catch(error => {
          message.error(error.response.data.message);
        });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="ghost" onClick={this.showModal} icon="user-add">
          Edit User
        </Button>
        {this.state.isLoaded && (
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            name={this.state.name}
            role={this.state.roles}
            email={this.state.email}
          />
        )}
      </div>
    );
  }
}

export default EditUser;
