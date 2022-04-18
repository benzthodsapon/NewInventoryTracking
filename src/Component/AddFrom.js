import React, { useEffect, useState } from "react";
import { Modal, Button, message, Form, Input } from "antd";
import AddBed from "./AddBed";
import AddWheelchair from "./AddWheelchair";
import AddOxgenTank from "./AddOxygenTank";
import "./Addfrom.css";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { firestore } from "../index";
import { async } from "@firebase/util";

const AddFrom = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDelelte, setIsModalVisibleDelelte] = useState(false);
  const [isModalVisibleInventory, setIsModalVisibleInventory] = useState(false);
  const [typeInventory, setTypeInventory] = useState([]);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [isSelected, setIsSelected] = useState("");
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalDelete = () => {
    setIsModalVisibleDelelte(true);
  };

  const handleOkDelete = () => {
    setIsModalVisibleDelelte(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisibleDelelte(false);
  };

  const showModalInventory = () => {
    setIsModalVisibleInventory(true);
  };

  const handleOkInventory = () => {
    setIsModalVisibleInventory(false);
  };

  const handleCancelInventory = () => {
    setIsModalVisibleInventory(false);
  };

  const handleChange = async (value) => {
    const result = await dispatch(await addToCart(value.type));
    console.log(result);
    if (result.payload) {
      setName(result.payload);
      setType(result.payload);
      let id =
        typeInventory.length === 0
          ? 1
          : typeInventory[typeInventory.length - 1].id + 1;
      await firestore
        .collection("TypeBorrow")
        .doc(id + "")
        .set({ id, name: result.payload, type:result.payload });
      message.success("Add Success");
      setIsModalVisibleInventory(false);
    }
  };

  useEffect(() => {
    retriveData();
  }, []);

  const retriveData = async () => {
    await firestore.collection("TypeBorrow").onSnapshot(async (snapshot) => {
      let typeInventoryDB = await snapshot.docs.map((d) => {
        const { id, name, type } = d.data();
        return { id, name, type };
      });
      setTypeInventory(typeInventoryDB);
    });
  };

  return (
    <>
      {/* add inventory */}
      <Button
        className="BB"
        type="primary"
        onClick={showModalInventory}
        style={{ margin: 5 }}
      >
        เพิ่มประเภทอุปกรณ์อุปกรณ์{" "}
      </Button>{" "}
      <Button
        className="BB"
        type="primary"
        onClick={showModal}
        style={{ margin: 5 }}
      >
        เพิ่มรายการอุปกรณ์{" "}
      </Button>{" "}
      <Button className="BB" type="primary " onClick={showModalDelete}>
        ลบรายการอุปกรณ์{" "}
      </Button>
      <Modal
        title="รายการ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {typeInventory.map((item) => {
          return (
            <>
              <AddBed name={item.name} type={item.type}>
                {item.name}
              </AddBed>
            </>
          );
        })}
      </Modal>
      {isModalVisibleDelelte && (
        <Modal
          title="ลบรายการ"
          visible={isModalVisibleDelelte}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
        >
          {typeInventory.map((item) => {
            return (
              <>
                <button
                  style={{
                    background: "#1890ff",
                    border: "none",
                    color: "white",
                    margin: "10px"
                  }}
                  onClick={() => history.push("/Delete")}
                >
                  {" "}
                  {item.name}
                </button>{" "}
              </>
            );
          })}
        </Modal>
      )}
      {isModalVisibleInventory && (
        <Modal
          title="เพิ่มประเภทอุปกรณ์"
          visible={isModalVisibleInventory}
          closable={true}
          onOk={handleOkInventory}
          onCancel={handleCancelInventory}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleChange}
            autoComplete="off"
          >
            <Form.Item label="ชื่อประเภทอุปกรณ์" name="type">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
export default AddFrom;
