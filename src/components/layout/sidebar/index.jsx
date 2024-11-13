import React, { useState } from "react";
// import menus from "./menus";
import { Button, Layout, Menu, Popconfirm, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined, UserAddOutlined, SolutionOutlined, ReadOutlined, ClockCircleOutlined, UsergroupAddOutlined,
  SettingOutlined, ApartmentOutlined, CheckCircleOutlined, TeamOutlined, CheckSquareOutlined, ScheduleOutlined,
  WalletOutlined, FolderOpenOutlined, PieChartOutlined, ShoppingCartOutlined, LogoutOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "store/auth";

const { Sider } = Layout;

const sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { myUser } = useSelector((state) => state.myUser)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(signOut())
    navigate("/auth/sign-in")
  }

  const confirm = (e) => {
    handleLogout()
    // message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };

  const menus = {

    // ADMIN
    Manager: [
      {
        key: "",
        icon: <HomeOutlined />,
        label: "Bosh sahifa",
      },
      {
        key: "xodimlar",
        icon: <UsergroupAddOutlined />,
        label: "Xodimlar",
        children: [
          {
            key: "xodimlar/direktor",
            label: "Direktor",
          },
          {
            key: "xodimlar/administrator",
            label: "Administrator",
          },
          {
            key: "xodimlar/o'qituvchi",
            label: "O'qituvchilar",
          },
          {
            key: "xodimlar/o'quvchi",
            label: "O'quvchilar",
          },
          {
            key: "xodimlar",
            label: "Barcha xodimlar",
          }
        ]
      },
      {
        key: "pupil",
        icon: <UserAddOutlined />,
        label: "Yangi o'quvchilar"
      },
      {
        key: "group",
        icon: <UsergroupAddOutlined />,
        label: "Guruhlar"
      },
      {
        key: "fanlar",
        icon: <ReadOutlined />,
        label: "Fanlar",
      },
      {
        key: "xonalar",
        icon: <SolutionOutlined />,
        label: "Xonalar",
      },
      {
        key: "chegirmalar",
        icon: <CheckCircleOutlined />,
        label: "Chegirma"
      },
      {
        key: "reklama",
        icon: <ApartmentOutlined />,
        label: "Reklama"
      },
      {
        key: "xarajatlar",
        icon: <ShoppingCartOutlined />,
        label: "Xarajatlar"
      }
    ],

    // ASSIST
    Boshqaruvchi: [
      {
        key: "",
        icon: <HomeOutlined />,
        label: "Home",
      }
    ],

    // USTOZ
    Ustoz: [
      {
        key: "",
        icon: <HomeOutlined />,
        label: "Home",
      }
    ],

    // PUPIL
    Oquvchi: [
      {
        key: "",
        icon: <HomeOutlined />,
        label: "Home",
      }
    ]
  }


  return (
    <Sider
      collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      collapsedWidth={`${screen.width <= 768 ? '0' : "70"}`}
      className="h-full overflow-y-scroll"
      width={"220px"}
    >
      <Menu
        mode="inline"
        // theme="dark"
        // theme="light"
        className="h-[90%] overflow-y-auto"
        defaultSelectedKeys={[location.pathname.replace("/", "").split("-")[0].split("/")[0]]}
        defaultOpenKeys={[location.pathname.split("/")[1]]}
        onClick={(item) => navigate(`/${item.key}`)}
        // items={menus[myUser?.status]}
        items={menus["Manager"]}

      />
      <div className="flex items-center justify-center bg-white py-3">
        <Tooltip placement='right' title={"Profildan chiqish"}>
          <Popconfirm
            title="Profildan chiqish"
            description="Profildan chiqishni xoxlaysizmi?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Ha"
            cancelText="Yo'q"
          >
            {
              collapsed ?
                <Button type="primary" danger><LogoutOutlined /></Button> :
                <Button className="w-[95%] mx-auto" type='primary' danger><LogoutOutlined /> Profildan chiqish</Button>
            }
          </Popconfirm>
        </Tooltip>
      </div>
    </Sider>
  );
};

export default sidebar;
