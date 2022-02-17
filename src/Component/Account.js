import { Card } from "antd";
import "./Account.css";
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
import BorrowedItems from "../Component/BorrowedItems";
import { useHistory, useLocation } from "react-router-dom";
import Timer from "../Component/Timer";
import { firestore } from "../index";
import Item from "antd/lib/list/Item";

import { Link } from "react-router-dom";

const { Meta } = Card;

const Account = (props) => {
  const history = useHistory();
  const [profile, setProfile] = useState([{}]);
  const [realMail, setRealMail] = useState("");
  const [realimg, setRealimg] = useState("");
  const [realName, setRealName] = useState("");
  const [realPosition, setRealPosition] = useState("");

  // let realimg;
  const { email } = (props.location && props.location.state) || {};
  console.log("email", email);
  //
  const retriveData = () => {
    firestore.collection("Profile").onSnapshot((snapshot) => {
      let MyProfile = snapshot.docs.map((d) => {
        const { Email, Name, Position, id, img } = d.data();
        console.log(Email, Name, Position, id, img);

        if (Email == email) {
          // history.push({pathname:"/Pagehome",state: {data: d}})
          setRealMail(Email);
          setRealimg(img);
          setRealName(Name);
          setRealPosition(Position);
        }

        return { Email, Name, Position, id, img };
      });

      setProfile(MyProfile);
    });
  };
  useEffect(() => {
    retriveData();
  });

  return (
    <div className="Profile">
      <Card
        hoverable
        style={{ width: 350 }}
        cover={
          <img
            alt="example"
            src={realimg}
          />
        }
      >
        <Meta title="Email" description={realMail} />
        <Meta title="Name" description={realName} />
        <Meta title="Position" description={realPosition} />
      </Card>
        <div>
      <button type="button" onClick={() => history.push("/PageHome")} style={{ marginTop: 25 }}>
        Go To Home Page
      </button>
      </div>
      
    </div>
  );
};
export default Account;
