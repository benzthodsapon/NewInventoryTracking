import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Upload, message } from "antd";
import PageHome from "../Page/PageHome";
import { firestore } from "../index";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "../FirebaseConfig/Config";


const AddBed = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [img, setImg] = useState("");
  const [location, setLocation] = useState([]);
  const [process, setProcess] = useState(0);
  const [InventoryTracking, setInventoryTracking] = useState([{}]);
  const [downloadURL, setDownloadURL] = useState(null);
  console.log("downloadURL .. ",downloadURL);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    onFinish();
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
    retriveData();
  }, []);

  const onFinish = async (values) => {
    if(downloadURL) {
      let id =
      InventoryTracking.length === 0
        ? 1
        : InventoryTracking[InventoryTracking.length - 1].id + 1;
   await firestore
      .collection(props.type)
      .doc(id + "")
      .set({ id, img: downloadURL, location, status, type });
      setIsModalVisible(false);
    }

    alert("You Add Finish");
  };

  const retriveData = async () => {
    await firestore.collection(props.type).onSnapshot((snapshot) => {
      let MyBed = snapshot.docs.map((d) => {
        const { id, img, location, status, type } = d.data();
        console.log(id, img, location, status, type);
        return { id, img, location, status, type };
      });
      console.log(MyBed);
      setInventoryTracking(MyBed);
    });
  };

  const handleChange = (e) => {
    setImg(e.target.files[0]);
    setTimeout(() => {
      handleUpload();
    }, 1500)
  };

  const handleUpload = async () => {
    let file = img;
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child("images/" + file.name).put(file);

    await uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProcess(progress);
      },
      (error) => {
        throw error;
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log("url : ",url);
          setDownloadURL(url);
        });
      }
    );
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ margin: "10px" }}>
        {props.name}
      </Button>{" "}
      <Modal
        title="Admin"
        visible={isModalVisible}
        footer={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name={["Type"]} label="ประเภทของอุปกรณ์">
            <Input onChange={(e) => setType(e.target.value)} />{" "}
          </Form.Item>{" "}
          <Form.Item name={["status"]} label="สถานะ">
            <Input onChange={(e) => setStatus(e.target.value)} />{" "}
          </Form.Item>
          <Form.Item name={["img"]} label="รูปภาพ">
            <input type="file" onChange={handleChange}></input>
            {/* <button className="button" onClick={handleUpload}>
              Upload
            </button> */}
          </Form.Item>
          <Form.Item name={["location"]} label="สถานที่จัดเก็บ">
            <Input onChange={(e) => setLocation(e.target.value)} />{" "}
          </Form.Item>{" "}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" disabled={!downloadURL} htmlType="submit">
              ส่ ง{" "}
            </Button>{" "}
          </Form.Item>{" "}
        </Form>{" "}
      </Modal>{" "}
    </>
  );
};
export default AddBed;
