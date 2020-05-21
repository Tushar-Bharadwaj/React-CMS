import React from "react";
import { Card, Button, Row, Col, Switch } from "antd";
import { AWS_PREFIX } from "../../constants/SiteConfig";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const NewsTable = ({
  data,
  deleteNews,
  toggleTrending,
  togglePublished,
  initializeNews,
}) => {
  let SwitchTrending = (record) => {
    if (record.trending) {
      return <Switch checked onChange={() => toggleTrending(record.id)} />;
    }
    return (
      <Switch checked={false} onChange={() => toggleTrending(record.id)} />
    );
  };

  let SwitchPublished = (record) => {
    if (record.published) {
      return <Switch checked onChange={() => togglePublished(record.id)} />;
    }
    return (
      <Switch checked={false} onChange={() => togglePublished(record.id)} />
    );
  };

  return (
    <Card title="Card Title">
      {data?.map((details) => {
        return (
          <Card.Grid style={gridStyle} key={details.id}>
            <img
              src={AWS_PREFIX + details.imagePath}
              alt={details.id}
              style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
            />
            ;
            <Card.Meta title={details.title} description={details.shortText} />
            <br />
            <Row>
              <Col span={12}>
                <Button type="primary">Edit</Button>
              </Col>
              <Col span={12}>
                <Button type="danger" onClick={() => deleteNews(details.id)}>
                  Delete
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <span>{SwitchPublished(details)}</span>
                <br />
                Publish
              </Col>
              <Col span={12}>
                <span>{SwitchTrending(details)}</span>
                <br />
                Set Trending
              </Col>
            </Row>
          </Card.Grid>
        );
      })}
    </Card>
  );
};

export default NewsTable;
