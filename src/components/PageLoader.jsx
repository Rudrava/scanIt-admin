import { Col, Row, Spin } from "antd";

const PageLoader = () => {
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
                <img
                    src="/images/logo-snap-it.webp"
                    alt="Mio Amore Logo"
                    width="200px"
                    height="200px"
                    style={{ display: "block" }}
                />
                <Spin size="large" />
            </Col>
        </Row>
    );
};

export default PageLoader;
