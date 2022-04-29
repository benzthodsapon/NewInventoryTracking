import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useHistory, useLocation } from "react-router-dom";
import { firestore } from "../index";
import { Card } from "antd";
import { DownSquareOutlined } from "@ant-design/icons";
const { Meta } = Card;

const Items = (props) => {
  const history = useHistory();
  const [data, setData] = useState([{}]);

  const retriveData = () => {
    props?.match?.params?.name &&
      firestore
        .collection(props?.match?.params?.name)
        .onSnapshot((snapshot) => {
          let item = snapshot.docs.map((d) => {
            const { id, status, type, img } = d.data();
            console.log(id, status, type, img);
            return { id, status, type, img };
          });
          setData(item);
        });
  };

  useEffect(() => {
    retriveData();
  }, []);

  return (
    <>
      <div className="WheelchairCss">
        {props?.match?.params?.name &&
          data?.map((item) => {
            return (
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
                          history.push(`/SelectedItem/${props.match.params.name}/${item.id}`)
                        }
                      >
                        {" "}
                        <DownSquareOutlined /> กดปุ่มเพื่อยืม
                      </h1>,
                    ]}
                  >{console.log("props .. ",props.match.params.name)}
                    <Meta
                      title={`รหัสอุปกรณ์ ${item.id}`}
                      description={item.type}
                    />
                    <Meta description={item.status} />
                  </Card>
            )

            
          })}
      </div>
    </>
  );
};
export default Items;
