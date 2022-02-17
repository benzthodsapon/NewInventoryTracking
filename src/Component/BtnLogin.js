import React, { useState } from "react";
import { Modal, Button } from "antd";
import PopupLogin from "./PopupLogin";
const BtnLogin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="btn-login">
      <Button
        type="primary"
        onClick={showModal}
        style={{ width: "70%", height: "50px", marginTop: "158px" }}
      >
        Login
      </Button>
      <Modal
      onCancel = {handleCancel}
        title="Login"
        visible={isModalVisible}
        footer={null}
      >
        <PopupLogin />
      </Modal>
    </div>
  );
};

export default BtnLogin;
