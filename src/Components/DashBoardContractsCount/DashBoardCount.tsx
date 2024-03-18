import { Card, Col, Row } from "antd";
import React from "react";
import CountUp from "react-countup";

interface countType {
  contractCount: number;
  Contract: string;
}

const DashBoardCount = ({ contractCount, Contract }: countType) => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card
          style={{
            width: "135px",
            height: "120px",
            padding: "0px",
            transform: "scale",
            backgroundColor: "#f4f4f4",
          }}
        >
          <p style={{ fontSize: "15px", paddingLeft: "13%" }}>{Contract}</p>
          <CountUp
            end={contractCount}
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginLeft: "22.6px ",
              marginBottom: "1px",
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashBoardCount;
