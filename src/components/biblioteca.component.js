import React, { useState, useEffect } from "react";
import axios from 'axios';


import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';

import { Button, Modal, Typography, Input, Image, Form, notification, Tooltip, InputNumber } from 'antd';
const { Paragraph } = Typography;

export default function App() {
    const [error, setError] = useState(null);
    const [videojuegos, setvideojuegos] = useState([]);

    const [ellipsis] = React.useState(true);
    var videojuegosArray = [];
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
                    setvideojuegos(videojuegosArray);}
                });
                
            }
        });
    }, [])

    return (
        <>
            <div className="m-4 p-2">
               
            {videojuegos.map(videojuegos => (  

                <div className="col-lg-4 col-md-6">
                    <div className="card m-3">

                    <div className="card-body">
                                <h3 className="card-title">{videojuegos.nombre}</h3>

                                <Paragraph style={{ whiteSpace: "pre-line" }}
                                    ellipsis={
                                        ellipsis ? {
                                            rows: 1.5,
                                            expandable: true,
                                            symbol: 'leer más',
                                        } : false
                                    }>
                                    {videojuegos.descripcion}
                                </Paragraph>

                                <h4>{videojuegos.precio}€</h4><Button id="btnComprar" shape="round" onClick={() => {
                                    
                                }}>Más info</Button>

                            </div>
                    </div>
                </div> 
                ))}
            </div>
        </>
    );
}