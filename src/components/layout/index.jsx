import { Button, Layout } from "antd";
import Sidebar from "components/layout/sidebar";
import Content from "components/layout/content";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const index = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen overflow-y-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content collapsed={collapsed} setCollapsed={setCollapsed}>{children}</Content>
    </Layout>
  );
};

export default index;
