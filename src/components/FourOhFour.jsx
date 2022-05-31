import { Col, Row, Spin, Typography } from "antd";

const FourOhFour = () => {
    return (
        <Row style={{ height: "100vh" }} align="middle" justify="center">
            <Col
                style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography.Title level={3}>
                    404 - Page Not Found
                </Typography.Title>
            </Col>
        </Row>
    );
};

export default FourOhFour;
