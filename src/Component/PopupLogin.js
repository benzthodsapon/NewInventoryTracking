import { Form, Input, Button,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { auth } from "../FirebaseConfig/Config";
import React, { useState } from "react";


const PopupLogin = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const linkto = () => {
  //   history.push("/Pagehome");
  // };
  const handleSubmit = (value) => {
    console.log(value);
    setLoading(true);
    auth
      .signInWithEmailAndPassword(value.email, value.password)
      .then((data) => {
        console.log("dataLogin",value.email);
        history.push({pathname:"/Account",state: {email: value.email}})
        console.log("test");      
      })
      .catch((err) => {
        console.log(err);
        message.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
      });
    setLoading(false);
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" disabled={loading} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" disabled={loading} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
        
      </Form.Item>
    </Form>
  );
};
export default PopupLogin;
