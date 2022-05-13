import React, { useState, useEffect } from "react";
import axios from 'axios';


import { UploadOutlined, FileImageOutlined ,PoweroffOutlined} from '@ant-design/icons';

import { Button, Modal, Typography, Input, Image,Rate,Row,Col,Card, Form, notification, Tooltip, InputNumber } from 'antd';
const { Paragraph } = Typography;

const { Meta } = Card;
export default function App() {
    const [error, setError] = useState(null);
    const [videojuegos, setvideojuegos] = useState([]);

    const [ellipsis] = React.useState(true);
    var videojuegosArray = [];
    

    const [loadings, setLoadings] = useState([]);

    const enterLoading = index => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
  
      setTimeout(() => {
        setLoadings(prevLoadings => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 6000);
    };
    useEffect(() => {

        axios.get("https://localhost:7117/api/GameStock/Biblioteca/"+sessionStorage.getItem("idUsuario"), {
           
        }) .then((response) => {
            //console.log(response.data);
            
            for (let i = 0; i < (response.data).length; i++) {

                axios.get("https://localhost:7117/api/GameStock/videojuegos/"+response.data[i].idvideojuego, {
                }) .then((response2) => {
                    videojuegosArray.push(response2.data);
                    console.log(videojuegosArray);

                    if (i == (response.data).length-1){
                        setvideojuegos(videojuegosArray);
                    }
                });
                
            }
        });
    }, [])

    return (
        <>
            <div className="m-4 p-2">
               
            <Row>
                {videojuegos.map((videojuegos, index)  => (  
                    <Col span={8} style = { {marginTop: '30px'}}>
                        <Card hoverable style={{ width: 300,borderRadius: "20px"}} cover={ <Image src={videojuegos.imagen} preview={false}style={{borderRadius: "20px"}} id="imgJuegoUsuario" className="mb-4" alt="imagen" height={200}></Image>}>
                        <Meta title={videojuegos.nombre} description={<Button type="primary"icon={<PoweroffOutlined />} loading={loadings[index]} onClick={() => enterLoading(index)}>Jugar</Button>}/>
                        </Card>
                        </Col>
                    ))}
                    </Row>
            </div>
        </>
    );
}