import { DesktopOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, link, children) {
    return {
        key,
        icon,
        children,
        label,
        link,
    };
}

const items = [
    getItem("Dashboard", "1", DesktopOutlined, ""),
    getItem("Inventory", "2", UserOutlined, "inventory"),
    getItem("Make Sell", "3", FileOutlined, "sell"),
];

const CustomLayout = memo(({ children }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState("1");
    useEffect(() => {
        // get the active key from the url
        const path = window.location.pathname;
        const key = path.split("/")[1];
        setActiveKey(items.filter((e) => e.link === key)?.[0]?.key);
    }, []);
    const menuItems = useMemo(() =>
        items.map((item) => (
            <Menu.Item key={item.key} onClick={() => setActiveKey(item.key)}>
                <Link to={item.link}>
                    <item.icon />
                    <span>{item.label}</span>
                </Link>
            </Menu.Item>
        ))
    );
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
                <Image
                    width={130}
                    style={{
                        marginLeft: "20px",
                        marginTop: "8px",
                    }}
                    src="images/logo-snap-it.webp"
                />
                <Menu
                    theme="dark"
                    activeKey=""
                    defaultSelectedKeys={["1"]}
                    selectedKeys={[activeKey]}
                    mode="inline"
                >
                    {menuItems}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
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

export default CustomLayout;
