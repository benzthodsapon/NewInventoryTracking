import React, { useState,useEffect } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import PageHome from "../Page/PageHome";
import { firestore } from "../index";
import Wheelcahir from "./Wheelchair";

const AddWheelchair = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [img, setImg] = useState([]);
  const [location, setLocation] = useState([]);

  const [InventoryTracking, setInventoryTracking] = useState([{}]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  useEffect(() => {


    retriveData()
    


  },)
  const onFinish = (values) => {
    
    let id =
      InventoryTracking.length === 0
        ? 1
        : InventoryTracking[InventoryTracking.length - 1].id + 1;
    firestore
      .collection("Wheelchair")
      .doc(id + "")
      .set({ id, img, location, status, type });
    alert("You Add Finish");
  };

  const retriveData = () => {

    firestore.collection("Wheelchair").onSnapshot(snapshot => {


      let MyWheelchair = snapshot.docs.map(d => {

        const {id, img, location, status, type } = d.data()
        console.log(id, img, location, status, type)
        return { id, img, location, status, type}

      })
      setInventoryTracking(MyWheelchair)

    })
  }


  return (
    <>
      <Button type="primary" onClick={showModal}style={{ marginLeft:"10px" }}>
        รถเข็นผู้ป่วย
      </Button>
      <Modal
        title="Admin"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name={["Type"]} label="ประเภทของอุปกรณ์">
            <Input onChange={(e) => setType(e.target.value)} />
          </Form.Item>
          <Form.Item name={["status"]} label="สถานะ">
            <Input onChange={(e) => setStatus(e.target.value)} />
          </Form.Item>

          <Form.Item name={["img"]} label="รูปภาพ">
            <Input onChange={(e) => setImg(e.target.value)} />
          </Form.Item>
          <Form.Item name={["location"]} label="สถานที่จัดเก็บ">
          <Input onChange={(e) => setLocation(e.target.value)} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button onClick={onFinish} type="primary" htmlType="submit">
              ส่ง
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddWheelchair;
