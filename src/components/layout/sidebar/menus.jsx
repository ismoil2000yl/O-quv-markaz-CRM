import {
  HomeOutlined, UserAddOutlined, SolutionOutlined, ReadOutlined, ClockCircleOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
const menus = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "users",
    icon: <UsergroupAddOutlined />,
    label: "Foydalanuvchilar"
  },
  {
    key: "room",
    icon: <SolutionOutlined />,
    label: "Xonalar"
  },
  {
    key: "lesson",
    icon: <ReadOutlined />,
    label: "Darslar"
  },
  {
    key: "lesson-time",
    icon: <ClockCircleOutlined />,
    label: "Dars vaqti"
  },
  {
    key: "pupil",
    icon: <UserAddOutlined />,
    label: "O'quvchi qo'shish"
  }
];

export default menus;

// myUser === "admin" &&
