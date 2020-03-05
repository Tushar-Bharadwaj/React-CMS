import React from "react";
import "../component.style.css";
import { AuthorizedRequests } from "utils/AxiosHelper";

import { Button, Modal, Form, Input, message } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, name } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Edit Language"
          okText="Update"
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
          </Form>
        </Modal>
      );
    }
  }
);

class EditLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "",
      isLoaded: false
    };
  }

  showModal = () => {
    AuthorizedRequests.get(`/language/${this.props.languageId}`)
      .then(response => {
        this.setState({
          name: response.data.name,
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
  handleUpdate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return "";
      }
      AuthorizedRequests.put(`/language/${this.props.languageId}`, {
        name: values.name
      })
        .then(response => {
          message.success("Language Updated Successfully");
          form.resetFields();
          this.props.initializeLanguage();
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
          Edit Language
        </Button>
        {this.state.isLoaded && (
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleUpdate}
            name={this.state.name}
            role={this.state.roles}
            email={this.state.email}
          />
        )}
      </div>
    );
  }
}

export default EditLanguage;
