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
      const {
        visible,
        onCancel,
        onCreate,
        form,
        handleImageUpload,
      } = this.props;
      const { getFieldDecorator } = form;
      const { manager } = this.props;
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
                rules: [
                  { required: true, message: "Please Enter News Title!" },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Content">
              {getFieldDecorator("content", {
                rules: [
                  { required: true, message: "Please Enter News Content!" },
                ],
              })(<Input.TextArea />)}
            </Form.Item>
            <Form.Item label="Short Text">
              {getFieldDecorator("shortText", {
                rules: [
                  { required: true, message: "Please Enter News ShortText!" },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Genre">
              {getFieldDecorator("genreIds", {
                rules: [
                  {
                    required: true,
                    message: "Please select Genre!",
                    type: "array",
                  },
                ],
              })(
                <Select mode="multiple" placeholder="Please select genre">
                  {manager.genres.map((element) => (
                    <Option key={element.id} value={element.id}>
                      {element.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Source">
              {getFieldDecorator("sourceId", {
                rules: [
                  {
                    required: true,
                    message: "Please select Source!",
                  },
                ],
              })(
                <Select placeholder="Please select source">
                  {manager.sources.map((element) => (
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
                    type: "array",
                  },
                ],
              })(
                <Select mode="multiple" placeholder="Please select localities">
                  {manager.localities.map((element) => (
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
                    type: "array",
                  },
                ],
              })(
                <Select mode="multiple" placeholder="Please select language">
                  {manager.languages.map((element) => (
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
                    type: "array",
                  },
                ],
              })(<Select mode="tags" placeholder="Enter Tags"></Select>)}
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

class AddNews extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      genreLoaded: false,
      tagLoaded: false,
      localityLoaded: false,
      sourceLoaded: false,
      genres: "",
      tags: "",
      localities: "",
      languages: "",
      files: "",
      sources: "",
    };
  }

  handleImageUpload = (files) => {
    this.setState({ files: files.base64.split(",")[1] });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  initializeGenre = () => {
    this.setState({ genreLoaded: false });
    AuthorizedRequests.get(`/genre`)
      .then((response) => {
        this.setState({
          genres: response.data.all_the_genres,
          genreLoaded: true,
        });
      })
      .catch((error) => message.error(error));
  };
  initializeLocality = () => {
    this.setState({ localityLoaded: false });

    AuthorizedRequests.get(`/locality`)
      .then((response) => {
        this.setState({
          localities: response.data.all_the_localities,
          localityLoaded: true,
        });
      })
      .catch((error) => message.error(error));
  };
  initializeLanguage = () => {
    this.setState({ languageLoaded: false });

    AuthorizedRequests.get(`/language`)
      .then((response) => {
        this.setState({
          languages: response.data.all_the_languages,
          languageLoaded: true,
        });
      })
      .catch((error) => message.error(error));
  };
  initializeSource = () => {
    this.setState({ sourceLoaded: false });

    AuthorizedRequests.get(`/source`)
      .then((response) => {
        this.setState({
          sources: response.data.all_the_sources,
          sourceLoaded: true,
        });
      })
      .catch((error) => message.error(error));
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        alert("Error");
        return "";
      }
      console.log(this.state.files);
      let newsRequest = {
        userId: 1,
        title: values.title,
        text: values.content,
        shortText: values.shortText,
        tags: values.tags,
        localityIds: values.localityIds,
        languageIds: values.languageIds,
        genreIds: values.genreIds,
        sourceId: values.sourceId,
        base64string: this.state.files,
      };
      AuthorizedRequests.post("/auth/news", newsRequest)
        .then((response) => {
          message.success("News Uploaded Successfully");
          form.resetFields();
          this.setState({ visible: false });
        })
        .catch((error) => {
          console.log(error.response.data);
          message.error(error.response.data.message);
        });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  componentDidMount() {
    this.initializeGenre();
    this.initializeLocality();
    this.initializeLanguage();
    this.initializeSource();
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} icon="user-add">
          Add News
        </Button>
        {this.state.languageLoaded &&
          this.state.localityLoaded &&
          this.state.genreLoaded &&
          this.state.sourceLoaded && (
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              manager={this.state}
              handleImageUpload={this.handleImageUpload}
            />
          )}
      </div>
    );
  }
}

export default AddNews;
