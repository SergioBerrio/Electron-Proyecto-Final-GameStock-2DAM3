import React, { useState, useEffect } from "react";
import axios from 'axios';
import $ from "jquery";
import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';
import { Button, Modal, Typography, Input, Image, Form, notification, Tooltip, InputNumber,Rate,Divider } from 'antd';
const { Paragraph } = Typography;

export default function App() {
    const [error, setError] = useState(null);
    const [videojuegos, setvideojuegos] = useState([]);
    const [ellipsis] = React.useState(true);
    var arrayCategoria = [];

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
            console.log(response.data);
                
            setvideojuegos(response.data);
                
        })
       
    }, [])
    
    
    $( document ).ready(function() {
        
    $("#categoriaAccion").on('click', function() {

        if(arrayCategoria.includes("Accion")){

            $("#categoriaAccion").css("font-weight", "");

            for (let i = 0; i < arrayCategoria.length; i++) {
                if(arrayCategoria[i] === "Accion") {
                    arrayCategoria.splice(i, 1);
                }
            }

            console.log(arrayCategoria);

        } else {

            $("#categoriaAccion").css("font-weight", "bold");

            arrayCategoria.push("Accion");

            console.log(arrayCategoria)
        }
    });

    $("#categoriaAventura").on('click', function() {

        if(arrayCategoria.includes("Aventura")){

            $("#categoriaAventura").css("font-weight", "");

            for (let i = 0; i < arrayCategoria.length; i++) {
                if(arrayCategoria[i] === "Aventura") {
                    arrayCategoria.splice(i, 1);
                }
            }

            console.log(arrayCategoria);

        } else {

            $("#categoriaAventura").css("font-weight", "bold");

            arrayCategoria.push($("#categoriaAventura").text());

            console.log(arrayCategoria);
        }
    });

    $("#categoriaSurvival").on('click', function() {

        if(arrayCategoria.includes("Survival")){

            $("#categoriaSurvival").css("font-weight", "");

            for (let i = 0; i < arrayCategoria.length; i++) {
                if(arrayCategoria[i] === "Survival") {
                    arrayCategoria.splice(i, 1);
                }
            }

            console.log(arrayCategoria);

        } else {

            $("#categoriaSurvival").css("font-weight", "bold");

            arrayCategoria.push($("#categoriaSurvival").text());

            console.log(arrayCategoria);
        }
    });

    $("#categoriaMMO").on('click', function() {

        if(arrayCategoria.includes("MMO")){
            
            $("#categoriaMMO").css("font-weight", "");

            for (let i = 0; i < arrayCategoria.length; i++) {
                if(arrayCategoria[i] === "MMO") {
                    arrayCategoria.splice(i, 1);
                }
            }

            console.log(arrayCategoria);

        } else {

            $("#categoriaMMO").css("font-weight", "bold");

            arrayCategoria.push($("#categoriaMMO").text());

            console.log(arrayCategoria);
        }
    });

    $("#categoriaShooter").on('click', function() {

        if(arrayCategoria.includes("Shooter")){

            $("#categoriaShooter").css("font-weight", "");

            for (let i = 0; i < arrayCategoria.length; i++) {
                if(arrayCategoria[i] === "Shooter") {
                    arrayCategoria.splice(i, 1);
                }
            }

            console.log(arrayCategoria);

        } else {

            $("#categoriaShooter").css("font-weight", "bold");

            arrayCategoria.push($("#categoriaShooter").text());

            console.log(arrayCategoria);
        }
    });

    $("#categoriaMundoAbierto").on('click', function() {

        if(arrayCategoria.includes("Mundo abierto")){

            $("#categoriaMundoAbierto").css("font-weight", "");

            for (let i = 0; i < arrayCategoria.length; i++) {
                if(arrayCategoria[i] === "Mundo abierto") {
                    arrayCategoria.splice(i, 1);
                }
            }

            console.log(arrayCategoria);

        } else {

            $("#categoriaMundoAbierto").css("font-weight", "bold");

            arrayCategoria.push($("#categoriaMundoAbierto").text());

            console.log(arrayCategoria);
        }
    });
    });


    return (
        <>
            <div className="m-4 p-2">
            <div>
                <div class="field" id="searchform">
                    <input type="text" id="searchterm" placeholder="Escribe lo que quieras busscar" />
                        <button className="btn btn-primary" type="button">
                            Buscar
                        </button>
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Abrir filtros
                        </button>
                </div>
                    

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
                        <Rate  id="estrellitas" defaultValue={3}></Rate>

                        <br></br>
                        <br></br>
                        <br></br>
                        
                        <label className="m-2" style={{textAlign: "left"}} > Categorias : </label>
                        
                        <br></br>
                        
                        <span id="categoriaAccion">Acción</span>
                        <br></br>
                        <span id="categoriaAventura">Aventura</span>
                        <br></br>
                        <span id="categoriaSurvival">Survival</span>
                        <br></br>
                        <span id="categoriaMMO">MMO</span>
                        <br></br>
                        <span id="categoriaShooter">Shooter</span>
                        <br></br>
                        <span id="categoriaMundoAbierto">Mundo abierto</span>

                        </div>
                    </div>
                </div>

                <div id="divJuegos">
                {videojuegos.map(videojuegos => (  

                    <div className="col-lg-4 col-md-6">
                        <div class="card m-3">

                           <div className="card-body">
                                    <h3 className="card-title">{videojuegos.nombre}</h3>

                                    <Image src={videojuegos.imagen} id="imgJuegoUsuario" className="mb-4" alt="imagen" height={200}></Image>


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
            </div>
        </>
    );
}