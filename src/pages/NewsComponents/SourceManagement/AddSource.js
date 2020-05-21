import React from "react";
import "../component.style.css";
import { AuthorizedRequests } from "utils/AxiosHelper";
import FileBase64 from "react-file-base64";

import { Button, Modal, Form, Input, message } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible,
        onCancel,
        onCreate,
        form,
        handleImageUpload,
      } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Create A Source"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Please Enter Source Name!" },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              <FileBase64
                multiple={false}
                onDone={handleImageUpload.bind(this)}
              />
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class AddSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      base64: "",
    };
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleImageUpload = (files) => {
    this.setState({ files: files.base64.split(",")[1] });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return "";
      }
      console.log(this.state.files);
      AuthorizedRequests.post("/source", {
        name: values.name,
        base64: this.state.files,
      })
        .then((response) => {
          message.success("Source Created Successfully");
          form.resetFields();
          this.props.initializeSource();
          this.setState({ visible: false });
        })
        .catch((error) => {
          console.log(error.response.data.message);
          message.error(error.response.data.message);
        });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} icon="user-add">
          Add Source
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          handleImageUpload={this.handleImageUpload}
        />
      </div>
    );
  }
}

export default AddSource;
