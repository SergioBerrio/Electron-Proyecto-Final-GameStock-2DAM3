import React, { useState, useEffect } from "react";
import axios from 'axios';


import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';

import { Button, Modal, Typography, Input, Image, Form, notification, Tooltip, InputNumber,Rate,Divider } from 'antd';
const { Paragraph } = Typography;

export default function App() {
    const [error, setError] = useState(null);
    const [tienda, settienda] = useState([]);

    const [ellipsis] = React.useState(true);

    useEffect(() => {
        
        var customRange1 = document.getElementById("customRange1");
        var minV = document.getElementById("minV");
        var customRange2 = document.getElementById("customRange2");
        var maxV = document.getElementById("maxV");

        customRange1.value = 10;
        customRange2.value = 250;
        minV.innerHTML = customRange1.value + " € ";
        maxV.innerHTML = customRange2.value + " € ";

        customRange1.addEventListener("input", () => { 
            
            if (parseInt(customRange1.value) > parseInt(customRange2.value)){
                customRange2.value = customRange1.value;
                maxV.innerHTML = customRange1.value + " € ";
            }

            minV.innerHTML = customRange1.value + " € "; 

        });
  
        customRange2.addEventListener("input", () => {

            if (parseInt(customRange2.value) < parseInt(customRange1.value)){
                customRange1.value = customRange2.value;
                minV.innerHTML = customRange2.value + " € ";
            }

            maxV.innerHTML = customRange2.value + " € "; 

        });

        axios.get("https://localhost:7117/api/GameStock/videojuegos", {
           
        }) .then((response) => {
            console.log(response);
            if(response.data.status==="success"){
                
            //console.log(response);
                /*sessionStorage.setItem('email', document.getElementById("email").value);
                sessionStorage.setItem("token", response.data.token); 
                window.location.href = "/";*/
                
            }else{
                
            //console.log(response);
            }
        })
       
    }, [])
    
    return (
        <>
            <div className="m-4 p-2">
            <div>
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        Abrir filtros
                    </button>

                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Filtros de búsqueda</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            
                        
                        <label htmlFor="customRange1" className="htmlForm-label m-2"> Precio Mínimo : </label>
                        <input type="range" min="0" max="500" step="10" id="customRange1"/>
                        <span className="m-2" id="minV">20 €</span>

                        <br></br>

                        <label htmlFor="customRange2" className="htmlForm-label m-2"> Precio Máximo : </label>
                        <input type="range" min="0" max="500" step="10" id="customRange2"/>
                        <span className="m-2" id="maxV">250 €</span>
                        
                        <br></br><br></br><br></br>
                        <label htmlFor="estrellitas" className="htmlForm-label m-2"> Valoración : </label>
                        <Rate  id="estrellitas"></Rate>

                        <br></br>
                        <br></br>
                        <br></br>
                        
                        <label className="m-2" style={{textAlign: "left"}} > Categorias : </label>
                        
                        <br></br>
                        
                        <a>Acción</a>
                        <br></br>
                        <a>Aventura</a>
                        <br></br>
                        <a>Survival</a>
                        <br></br>
                        <a>MMO</a>
                        <br></br>
                        <a>Shooter</a>
                        <br></br>
                        <a>Mundo abierto</a>

                        </div>
                    </div>
                </div>

                <div id="divJuegos">




                </div>
            </div>
        </>
    );
}