import { useHistory, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Mentions,Form, Button} from "antd";
import { firestore } from "../index";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./detail.css";

const { Meta } = Card;

const DamagedBed = () => {
  const history = useHistory();

  const [InventoryTracking, setInventoryTracking] = useState([{}]);
  const [id, setId] = useState(0);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [img, setImg] = useState([]);
  const [location, setLocation] = useState([]);
  const [MyDamaged, setDamaged] = useState([{}]);
  const [DamagedBed, setDamagedBed] = useState([{}]);

  const onADD = (id, img, location, status, type) => {
    firestore
      .collection("damaged")
      .doc(id.toString())
      .set({ id, img, location, status, type });
    alert("ทำการยืมเสร็จเรียบร้อย");
  };
  const retriveData = () => {
    firestore.collection("DamagedBed").onSnapshot((snapshot) => {
      let MyBed = snapshot.docs.map((d) => {
        const { id, img, location, status, type } = d.data();
        return { id, img, location, status, type };
      });
      setDamagedBed(MyDamaged);
    });
  };
  const retriveDataDamaged = () => {
    firestore.collection("Bed").onSnapshot((snapshot) => {
      let MyDamaged= snapshot.docs.map((d) => {
        const { id, img, location, status, type } = d.data();
        return { id, img, location, status, type };
      });

      setDamaged(MyDamaged);
    });
  };
  useEffect(() => {
    retriveData();
    retriveDataDamaged();
  });
 
  return (
    <div className="Bedid">
      {DamagedBed.map((item) => {
        return (
          <>
            {item?.id?.toString() ===
              history.location.pathname.substr(
                history.location.pathname.length - 1
              ) && (
              <div>
                <Card
                  style={{ width: 300, marginRight: "20px" }}
                  cover={
                    <img
                      style={{ width: 200, height: 250 }}
                      alt="example"
                      src={item.img}
                    />
                  }
                  actions={[
                    <h1
                      onClick={() =>
                        onADD(
                          item.id,
                          item.img,
                          item.location,
                          item.status,
                          item.type
                        )
                      }
                    >
                      <CheckCircleOutlined />
                      แจ้งชำรุด
                    </h1>,
                  ]}
                >
                  <Meta
                    title={`รหัสอุปกรณ์ ${item.id}`}
                    description={item.type}
                  />
                  <Meta description={`สถานที่จัดเก็บ ${item.location}`} />
                </Card>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
export default DamagedBed;
