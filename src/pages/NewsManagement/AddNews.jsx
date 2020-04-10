import React from "react";
import "./style.css";
import { AuthorizedRequests } from "utils/AxiosHelper";
import FileBase64 from "react-file-base64";

import { Button, Modal, Form, Input, Select, message } from "antd";
const { Option } = Select;

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor() {
      super();
      this.state = { files: "" };
    }
    getFiles(files) {
      this.setState({ files: files.base64.split(",")[1] });
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { manager } = this.props;
      console.log(manager.genres.map(el => el.id));
      return (
        <Modal
          visible={visible}
          title="Add News"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          width={1000}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "Please Enter News Title!" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Content">
              {getFieldDecorator("content", {
                rules: [
                  { required: true, message: "Please Enter News Content!" }
                ]
              })(<Input.TextArea />)}
            </Form.Item>
            <Form.Item label="Short Text">
              {getFieldDecorator("shortText", {
                rules: [
                  { required: true, message: "Please Enter News ShortText!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Genre">
              {getFieldDecorator("genreIds", {
                rules: [
                  {
                    required: true,
                    message: "Please select Genre!",
                    type: "array"
                  }
                ]
              })(
                <Select mode="multiple" placeholder="Please select genre">
                  {manager.genres.map(element => (
                    <Option key={element.id} value={element.id}>
                      {element.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Locality">
              {getFieldDecorator("localityIds", {
                rules: [
                  {
                    required: true,
                    message: "Please select Locality!",
                    type: "array"
                  }
                ]
              })(
                <Select mode="multiple" placeholder="Please select localities">
                  {manager.localities.map(element => (
                    <Option key={element.id} value={element.id}>
                      {element.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Lanugage">
              {getFieldDecorator("languageIds", {
                rules: [
                  {
                    required: true,
                    message: "Please select your languages!",
                    type: "array"
                  }
                ]
              })(
                <Select mode="multiple" placeholder="Please select language">
                  {manager.languages.map(element => (
                    <Option key={element.id} value={element.id}>
                      {element.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Tags">
              {getFieldDecorator("tags", {
                rules: [
                  {
                    required: true,
                    message: "Please select your tags!",
                    type: "array"
                  }
                ]
              })(<Select mode="tags" placeholder="Enter Tags"></Select>)}
            </Form.Item>
            <Form.Item>
              <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
            </Form.Item>
            <Form.Item label="Title" style={{ display: "none" }}>
              {getFieldDecorator("file", {
                initialValue: this.state.files,
                rules: [{ required: true, message: "Please Upload file!" }]
              })(<Input style={{ display: "none" }} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class AddNews extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      genreLoaded: false,
      tagLoaded: false,
      localityLoaded: false,
      genres: "",
      tags: "",
      localities: "",
      languages: "",
      files: ""
    };
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  initializeGenre = () => {
    this.setState({ genreLoaded: false });
    AuthorizedRequests.get(`/genre`)
      .then(response => {
        this.setState({
          genres: response.data,
          genreLoaded: true
        });
        console.log(this.state.genres);
      })
      .catch(error => message.error(error));
  };
  initializeLocality = () => {
    this.setState({ localityLoaded: false });

    AuthorizedRequests.get(`/locality`)
      .then(response => {
        this.setState({
          localities: response.data,
          localityLoaded: true
        });
        console.log(this.state.localities);
      })
      .catch(error => message.error(error));
  };
  initializeLanguage = () => {
    this.setState({ languageLoaded: false });

    AuthorizedRequests.get(`/language`)
      .then(response => {
        this.setState({
          languages: response.data,
          languageLoaded: true
        });
        console.log(this.state.languages);
      })
      .catch(error => message.error(error));
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        alert("Error");
        return "";
      }
      let newsRequest = {
        userId: 1,
        title: values.title,
        text: values.content,
        shortText: values.shortText,
        tags: values.tags,
        localityIds: values.localityIds,
        languageIds: values.languageIds,
        genreIds: values.genreIds,
        base64string: values.file
      };
      AuthorizedRequests.post("/news", newsRequest)
        .then(response => {
          message.success("News Uploaded Successfully");
          form.resetFields();
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

  componentDidMount() {
    this.initializeGenre();
    this.initializeLocality();
    this.initializeLanguage();
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} icon="user-add">
          Add News
        </Button>
        {this.state.languageLoaded &&
          this.state.localityLoaded &&
          this.state.genreLoaded && (
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              manager={this.state}
            />
          )}
      </div>
    );
  }
}

export default AddNews;
