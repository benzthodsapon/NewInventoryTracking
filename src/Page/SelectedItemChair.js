import { useHistory,useLocation } from "react-router-dom";
import React, { useState,useEffect,} from "react";
import { Card, } from 'antd';
import { firestore } from '../index'
import "./detail.css"
import { CheckCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;
const SeletedItemChair = () => {
    const history = useHistory();
    console.log(history.location.pathname.substr(history.location.pathname.length - 1));
    const [InventoryTracking, setInventoryTracking] = useState([{}]);
  const [id, setId] = useState(0);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [img, setImg] = useState([]);
  const [location, setLocation] = useState([]);
  const [MyBorrow,setBorrow] = useState([{}]);
  const [ Wheelcahir ,setWheelchair] =useState([{}]);
    
  const retriveData = () => {

    firestore.collection("Wheelchair").onSnapshot(snapshot => {
  
       
  
        let MyWheelchair = snapshot.docs.map(d => {
  
          const { id,status,type,img,location } = d.data()
          console.log(id,status,type,img,location)
          return { id,status,type,img,location}
  
        })
  
        setWheelchair(MyWheelchair)
  
      })
    
    }
    const onADD = (id, img, location, status, type) => {
      firestore
      .collection("borrow")
      .doc(id.toString())
      .set({ id, img, location, status, type });
    alert("ทำการยืมเสร็จเรียบร้อย");
      }
    const retriveDataBorrow = () => {
      firestore.collection("borrow").onSnapshot((snapshot) => {
        
        let MyBorrow= snapshot.docs.map((d) => {
          const { id, img, location, status, type } = d.data();
          return { id, img, location, status, type };
        });
  
        setBorrow(MyBorrow);
      });
    };
  


    useEffect(() =>{
      retriveData();
      retriveDataBorrow();
    });
 
    return (
        
        <div className = "chairid">
            {
    Wheelcahir.map((item) => {
      return (
        <>
         {
           item?.id?.toString() === history.location.pathname.substr(history.location.pathname.length - 1) && (
               <div>
                  
                   <Card
            
            style={{ width: 300,marginRight: "20px" }}
            cover={
              <img 
                style ={{width: 200,height:250}}
                alt="example"
                src= {item.img}
              />
            }
            actions={[ 
              <h1 onClick={() => onADD(item.id, item.img, item.location, item.status, item.type)}>
                <CheckCircleOutlined />
                ยืนยันการยืม
              </h1>,
            ]}
          >
           <Meta
              title ={`รหัสอุปกรณ์ ${item.id}`}
              description={item.type}
            />
             <Meta
              description={`สถานที่จัดเก็บ ${item.location}`}
            />
          </Card>
               </div>
            
           )
         }
         
        </>
      )
    })
  }
  
        </div>
    )
  
  }
  export default SeletedItemChair;