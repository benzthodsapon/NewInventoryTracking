import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import AddBed from './AddBed';
import BtnLogin from './BtnLogin';
import AddWheelchair from './AddWheelchair';
import AddOxgenTank from './AddOxygenTank';
import "./Addfrom.css"
import DAdmin from './DAdmin';
import { useHistory, useLocation } from "react-router-dom";
const AddFrom = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
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
   
      <Button className='BB' type="primary" onClick={showModal} style={{margin:5}}>
       เพิ่มรายการอุปกรณ์ 
      </Button>
      <Button className='BB' type="primary " onClick={showModal}>
        ลบรายการอุปกรณ์
      </Button>
      
      <Modal title="รายการ" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <AddBed />
       <AddWheelchair />
       <AddOxgenTank/>
      </Modal>

      <Modal title="ลบรายการ" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <button onClick={()=>history.push("/Delete")}>เตียง</button>
      </Modal>
      
      
    </>
  );
};
export default AddFrom;