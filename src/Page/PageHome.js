import { Layout, Menu, Breadcrumb, Button, Modal } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  PlusCircleOutlined,
  FormOutlined,
  ShoppingCartOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import AddFrom from "../Component/AddFrom";
import { addComments, placeholder } from "@babel/types";
import React, { useState, useEffect } from "react";
import Bed from "../Component/Bed";
import Wheelcahir from "../Component/Wheelchair";
import OxygenTank from "../Component/OxygenTank";
import Account from "../Component/Account";
import DAdmin from "../Component/DAdmin";
import BorrowedItems from "../Component/BorrowedItems";
import DamagedItem from "../Component/DamagedItem";
import { useHistory, useLocation } from "react-router-dom";
import Timer from "../Component/Timer";
import { firestore } from "../index";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const PageHome = (props) => {
  
  const history = useHistory();

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    console.log("testcolllap", collapsed);
    setCollapsed(collapsed);
  };
  const [menuselect, setMenuselact] = useState(" ");

  const onSelect = (key) => {
    // if (key == "Account") {
    //   setMenuselact("Account");
    // } 
    if (key == "Bed") {
      setMenuselact("Bed");
    } else if (key == "Wheelchair") {
      setMenuselact("Wheelchair");
    } else if (key == "OxygenTank") {
      setMenuselact("OxygenTank");
    } else if (key == "BorrowedItems") {
      setMenuselact("BorrowedItems");
    } else if (key == "AddFrom") {
      setMenuselact("AddFrom");
    } else if (key == "DamagedItem")
    setMenuselact("DamagedItem")
    
    
     

    
  };

  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
         

          <Menu.Item
            key="2"
            icon={<AuditOutlined />}
            onClick={() => onSelect("BorrowedItems")}
          >
            รายการยืม
          </Menu.Item>

          <SubMenu key="sub1" icon={<FormOutlined />} title="คลังอุปกรณ์">
            <Menu.Item key="3" onClick={() => onSelect("Bed")}>
              เตียง
            </Menu.Item>
            <Menu.Item key="4" onClick={() => onSelect("Wheelchair")}>
              รถเข็นผู้ป่วย
            </Menu.Item>
            <Menu.Item key="5" onClick={() => onSelect("OxygenTank")}>
              ถังออกซิเจน
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="6" onClick={() => onSelect("DamagedItem")}>
            อุปกรณ์ชำรุด
          </Menu.Item>

          <Menu.Item key="7" onClick={() => onSelect("AddFrom")}>
            Admin
          </Menu.Item>
       
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <div>{/* <Timer /> */}</div>

        <Content style={{ margin: "0 15px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {menuselect == "Account" && <Account />}
            {menuselect == "Bed" && <Bed />}
            {menuselect == "Wheelchair" && <Wheelcahir />}
            {menuselect == "OxygenTank" && <OxygenTank />}
            {menuselect == "BorrowedItems" && <BorrowedItems />}
            {menuselect == "AddFrom" && <AddFrom />}
            {menuselect == "DamagedItem" && <DamagedItem />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageHome;
