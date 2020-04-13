import React from "react";
import { Card, Button, Row, Col, Switch } from "antd";
import { AWS_PREFIX } from "../../constants/SiteConfig";

const gridStyle = {
  width: "25%",
  textAlign: "center"
};

const NewsTable = ({ data, deleteNews, toggleStatus, initializeNews }) => {
  //   const SwitchStatus = record => {
  //     if (record.active) {
  //       return <Switch checked onChange={() => toggleStatus(record.id)} />;
  //     }
  //     return <Switch checked={false} onChange={() => toggleStatus(record.id)} />;
  //   };

  return (
    <Card title="Card Title">
      {data?.map(details => {
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
              <Col span={8}>
                <Button type="primary">Edit</Button>
              </Col>
              <Col span={8}>
                <Switch defaultChecked />
                <br />
                Publish
              </Col>
              <Col span={8}>
                <Switch defaultChecked />
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
