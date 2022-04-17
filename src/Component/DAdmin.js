import { Button, Card,  } from 'antd';
import { DownSquareOutlined } from '@ant-design/icons';
import React, { useState,useEffect,} from "react";
import { firestore } from '../index'
import "./Bed.css"
const { Meta } = Card;
const DAdmin= () => {
    
  const [ BedItem ,setBed] =useState([{}]);

  const deleteData = (id) => {
    console.log(id);
    firestore.collection("Bed").doc(id.toString()).delete();
  };

  const handleClick =()=>{
    console.log("CLICK");
  }
  const retriveData = () => {

    firestore.collection("Bed").onSnapshot(snapshot => {
      let MyBed = snapshot.docs.map(d => {

        const { id, img, location, status, type } = d.data()
        
        return {id, img, location, status, type}


      })

      setBed(MyBed)

    })
  }
  useEffect(() => {


    retriveData();

  })
    
    return (
        <div className="BedCss">
        {
        
        BedItem.map((item, index) => {
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

          >
            <Meta
              title ={`รหัสอุปกรณ์ ${item.id}`}
              description={item.type}
            />
             <Meta
              description={item.status}
            />
            <Button onClick={()=>deleteData(item.id)}>ลบอุปกรณ์</Button>
          </Card>
          
          )
          
        })
      }
    </div>
    )
  
    }
  export default DAdmin;