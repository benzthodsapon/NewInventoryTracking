
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import AddBed from './AddBed';
import BtnLogin from './BtnLogin';
import AddWheelchair from './AddWheelchair';
import AddOxgenTank from './AddOxygenTank';
const AddFrom = () => {
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
    <>
      <Button type="primary" onClick={showModal}>
       เพิ่มรายการอุปกรณ์
      </Button>
      <Modal title="รายการ" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <AddBed />
       <AddWheelchair />
       <AddOxgenTank/>
      </Modal>
      
      
    </>
  );
};
export default AddFrom;