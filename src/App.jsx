import { Typography } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/sell" element={<Sell />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

const Dashboard = () => {
    return <Typography.Title level={2}>Dashboard</Typography.Title>;
};

const Inventory = () => {
    return <Typography.Title level={2}>Inventory</Typography.Title>;
};

const Sell = () => {
    return <Typography.Title level={2}>Sell</Typography.Title>;
};
const FourOhFour = () => {
    return <Typography.Title level={2}>FourOhFour</Typography.Title>;
};

export default App;
