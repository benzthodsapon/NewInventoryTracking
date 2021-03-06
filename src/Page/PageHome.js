import { Layout, Menu, Breadcrumb, Button, Modal, message } from "antd";
import { FormOutlined, AuditOutlined } from "@ant-design/icons";
import AddFrom from "../Component/AddFrom";
import React, { useState, useEffect } from "react";
import Bed from "../Component/Bed";
import Wheelcahir from "../Component/Wheelchair";
import OxygenTank from "../Component/OxygenTank";
import Account from "../Component/Account";
import BorrowedItems from "../Component/BorrowedItems";
import DamagedItem from "../Component/DamagedItem";
import { firestore } from "../index";
import firebase from "firebase/compat/app";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Items from "../Component/Item";
import { auth } from "../FirebaseConfig/Config";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const PageHome = (props) => {
  const [profile, setProfile] = useState("");
  const [type, setType] = useState([]);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();

  // get current user from firebase
  var user = firebase.auth().currentUser;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    console.log("testcolllap", collapsed);
    setCollapsed(collapsed);
  };
  const [menuselect, setMenuselact] = useState(" ");

  useEffect(() => {
    retriveData();
  }, []);

  const handleLogOut = async () => {
    await auth.signOut();
    message.success("LogOut Success.")
    history.push("/");
  }

  const onSelect = (key) => {
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
    } else if (key == "DamagedItem") {
      setMenuselact("DamagedItem");
    } else {
      setMenuselact(key);
    }
    history.push(`/PageHome/${key}`);
  };

  const retriveData = () => {
    firestore.collection("Profile").onSnapshot((snapshot) => {
      let profile = snapshot.docs.map((d) => {
        const { id, Email, Name, Position, Role, img } = d.data();
        return { id, Email, Name, Position, Role, img };
      });
      setProfile(profile);
    });
    firestore.collection("TypeBorrow").onSnapshot((snapshot) => {
      let type = snapshot.docs.map((d) => {
        const { id, name, type } = d.data();
        return { id, name, type };
      });
      setType(type);
    });
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
            ???????????????????????????{" "}
          </Menu.Item>
          <SubMenu key="sub1" icon={<FormOutlined />} title="?????????????????????????????????">
            {type?.map((item, index) => {
              return (
                <>
                  <Menu.Item key={index} onClick={() => onSelect(item.type)}>
                    {item.name}
                  </Menu.Item>{" "}
                </>
              );
            })}
          </SubMenu>
          <Menu.Item key="6" onClick={() => onSelect("DamagedItem")}>
            ????????????????????? ???????????????{" "}
          </Menu.Item>
          {profile.length &&
            profile.map((item) => {
              return (
                <>
                  {item.Role === "Admin" && user.email === item.Email && (
                    <Menu.Item key="7" onClick={() => onSelect("AddFrom")}>
                      Admin{" "}
                    </Menu.Item>
                  )}
                </>
              );
            })}
          <Menu.Item key="6" onClick={handleLogOut}>
            ??????????????????????????????
          </Menu.Item>
        </Menu>{" "}
      </Sider>{" "}
      <Layout className="site-layout">
        <Content style={{ margin: "0 15px" }}>
        <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {menuselect == "Account" && <Account />}{" "}
            {menuselect == "Bed" && window.location.pathname.includes("Bed") && <Bed menuselect={menuselect} />}{" "}
            {menuselect == "Wheelchair" && window.location.pathname.includes("Wheelchair")  && <Wheelcahir menuselect={menuselect} />}{" "}
            {menuselect == "OxygenTank" && window.location.pathname.includes("OxygenTank")  && <OxygenTank menuselect={menuselect} />}{" "}
            {menuselect == "BorrowedItems" && window.location.pathname.includes("BorrowedItems")  && <BorrowedItems menuselect={menuselect} />}{" "}
            {menuselect == "AddFrom" && window.location.pathname.includes("AddFrom")  && <AddFrom menuselect={menuselect} />}{" "}
            {menuselect == "DamagedItem" && window.location.pathname.includes("Wheelchair")  && <DamagedItem menuselect={menuselect} />}{" "}
            {/* {history.location.pathname !== "/PageHome" &&
              !history.location.pathname.includes("AddFrom") && (
                <Items data={menuselect} />
              )} */}
          </div>{" "}
        </Content>{" "}
      </Layout>{" "}
    </Layout>
  );
};

export default PageHome;
