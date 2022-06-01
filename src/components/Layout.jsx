import { DesktopOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Row, Space, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts";
const { Header, Content, Sider } = Layout;
function getItem(label, key, link) {
    return {
        key,
        label,
        link,
    };
}

const CustomLayout = memo(({ children }) => {
    const { user, logout } = useAuth();
    const items = useMemo(
        () => [
            getItem(
                <NavLinkItem
                    item={{
                        link: "/",
                        icon: DesktopOutlined,
                        label: "Dashboard",
                    }}
                />,
                "1",
                ""
            ),
            getItem(
                <NavLinkItem
                    item={{
                        link: "/inventory",
                        icon: UserOutlined,
                        label: "Inventory",
                    }}
                />,
                "2",
                "inventory"
            ),
            getItem(
                <NavLinkItem
                    item={{
                        link: "/sell",
                        icon: FileOutlined,
                        label: "Sell",
                    }}
                />,
                "3",
                "sell"
            ),
        ],
        []
    );
    const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState(null);
    useEffect(() => {
        // get the active key from the url
        const path = window.location.pathname;
        const key = path.split("/")[1];
        setActiveKey(items.filter((e) => e.link === key)?.[0]?.key);
    }, []);

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <img
                    width={130}
                    style={{
                        marginLeft: "20px",
                        marginTop: "8px",
                    }}
                    alt="logo"
                    src="images/logo-snap-it.webp"
                />
                <Menu
                    theme="dark"
                    activeKey=""
                    defaultSelectedKeys={["1"]}
                    selectedKeys={[activeKey]}
                    mode="inline"
                    items={items}
                    // onSelect={({ key }) => {
                    //     setActiveKey(key);
                    // }}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: "auto",
                    }}
                >
                    <Row justify="end" align="middle" style={{}}>
                        <Space>
                            <Typography.Title
                                level={3}
                                style={{
                                    color: "white",
                                }}
                            >
                                Hi {user?.name.split(" ")[0]} !!!
                            </Typography.Title>
                            <Button onClick={logout} type="primary">
                                Log out
                            </Button>
                        </Space>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
});

const NavLinkItem = memo(({ item }) => {
    const { link, icon: Icon, label } = item;
    return (
        <NavLink
            to={link}
            style={{
                textDecoration: "none",
            }}
        >
            <Space>
                <Icon />
                <span>{label}</span>
            </Space>
        </NavLink>
    );
});

export default CustomLayout;
