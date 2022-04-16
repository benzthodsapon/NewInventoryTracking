import { Card,Button } from 'antd';
import { DownSquareOutlined,EditOutlined } from '@ant-design/icons';
import React, { useState,useEffect,} from "react";
import { useHistory } from "react-router-dom";
import { firestore } from '../index'
import "./Bed.css"

const { Meta } = Card;
const DAdmin  = () => {
const deleteData = (id) => {
        console.log(id);
        firestore.collection("bed").doc(id.toString()).delete();
      };
  const history = useHistory();
  const [ Bed ,setBed] =useState([{}]);
  const onADD = (id, img, location, status, type) => {
    firestore
      .collection("damaged")
      .doc(id.toString())
      .set({ id, img, location, status, type });
  };
  const retriveData = () => {

    firestore.collection("Bed").onSnapshot(snapshot => {
      let MyBed = snapshot.docs.map(d => {

        const { id,status,type,img } = d.data()
        console.log(id,status,type,img)
        return { id,status,type,img}

      })

      setBed(MyBed)

    })
  }
  useEffect(() => {


    retriveData()


  },)
  
    return (
    <div className="BedCss">
        {
        
        Bed.map((item) => {
          return (
            <Card
            style={{ width: 300,marginRight: "20px" }}
            cover={
              <img 
                style ={{width: 200,height:250,justifyContent:"center'"}}
                alt="example"
                src= {item.img}
              />
            }
           
          >
            <Meta
              title ={`รหัสอุปกรณ์ ${item.id}`}
              description={item.type}
            />
             <Meta
              description={item.status}
            />
           <Button onClick={()=>deleteData(item.id)}>กดปุ่มเพื่อคืน</Button>
          </Card>
          )
        })
      }
    </div>
)
};


export default DAdmin;