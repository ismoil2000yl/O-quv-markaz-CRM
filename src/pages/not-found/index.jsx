import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined, HomeOutlined
} from "@ant-design/icons";

const index = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Bu saxifa topilmadi"
      extra={
        <div className="w-full flex items-center justify-center gap-4">
          <Button type="primary" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
            Orqaga qaytish
          </Button>
          <Button className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80' type='ghost' onClick={() => navigate('/')}>
            <HomeOutlined />
            Bosh sahifa
          </Button>
        </div>
      }
    />
  );
};
export default index;
