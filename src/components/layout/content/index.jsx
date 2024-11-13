import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from '../header'
const { Content } = Layout;

const index = ({ setCollapsed, collapsed }) => {
  return (
    <div className="w-full">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content className="p-[10px]">
        <Outlet />
      </Content>
    </div>
  );
};

export default index;
