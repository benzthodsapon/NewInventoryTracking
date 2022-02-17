import { Button, Card,  } from 'antd';
import { DownSquareOutlined } from '@ant-design/icons';
import React, { useState,useEffect,} from "react";
import { firestore } from '../index'
import "./Bed.css"
const { Meta } = Card;
const BorrowedItems = () => {
    
  const [ BorrowedItems ,setBorrow] =useState([{}]);

  const deleteData = (id) => {
    console.log(id);
    firestore.collection("borrow").doc(id.toString()).delete();
  };

  const handleClick =()=>{
    console.log("CLICK");
  }
  const retriveData = () => {

    firestore.collection("borrow").onSnapshot(snapshot => {
      let MyBorrow = snapshot.docs.map(d => {

        const { id, img, location, status, type } = d.data()
        
        return {id, img, location, status, type}


      })

      setBorrow(MyBorrow)

    })
  }
  useEffect(() => {


    retriveData();

  })
    
    return (
        <div className="BedCss">
        {
        
        BorrowedItems.map((item, index) => {
          return (
            <Card
            key={index}
            style={{ width: 300,marginRight: "20px" }}
            cover={
              <img 
                style ={{width: 200,height:250}}
                alt="example"
                src= {item.img}
              />
            }
            // actions={[
              
            //   <div> <DownSquareOutlined onClick={handleClick}/> กดปุ่มเพื่อคืน</div>
             
            // ]}
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
  
    }
  export default BorrowedItems;