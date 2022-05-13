import React, { useState, useEffect, version } from "react";
import axios from 'axios';
import $ from "jquery";
import { CloseOutlined, CheckOutlined,MailOutlined ,LockOutlined,SmileOutlined,SolutionOutlined,UserOutlined} from '@ant-design/icons';
import { Button, Switch,Modal, Typography, Input, Image ,Card, Col, Row, Space,Rate,Divider,Form ,Steps} from 'antd';
const { Paragraph } = Typography;

export default function App() {
    const [videojuegos, setvideojuegos] = useState([]);
    const [comprando, setComprando] = useState(false);
    const [comprando2, setComprando2] = useState(false);
    const [buscando, setBuscando] = useState([])
    const [estrellitas, setEstrellitas] = useState(0);
    var arrayCategoria = [];
    const { Search } = Input;
    const { Meta } = Card;
    const { Step } = Steps;
    useEffect(() => {
        /*
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

        });*/

        axios.get("https://localhost:7117/api/GameStock/videojuegos", {
           
        }) .then((response) => {
            console.log(response.data);
                
            setvideojuegos(response.data);
                
        })
       
    }, [])

    const handleCancelCompra = () => {
        setComprando(false);
    };
    const handleCancelCompra2 = () => {
        setComprando2(false);
    };

    function comprar() {
        if(document.getElementById("emailcompra").value != "" && document.getElementById("passcompra").value != ""){
        
        setComprando(false);
        setComprando2(true);
        var adquirido = false;
        //llamandas para comprar juego
        axios.get("https://localhost:7117/api/GameStock/Biblioteca/"+sessionStorage.getItem("idUsuario"), {
           
        }) .then((response) => {
            console.log(response.data);
            
            for (let i = 0; i < (response.data).length; i++) {
             if (response.data[i].idvideojuego==sessionStorage.getItem("idJuego")){
                adquirido = true;
             }
            }
            console.log(adquirido);
            if(!adquirido){
            axios.post("https://localhost:7117/api/GameStock/biblioteca/insertar/"+sessionStorage.getItem("idUsuario")+"/"+sessionStorage.getItem("idJuego"), {
    
            })
                .then((response) => {
                    console.log(response)
                });
                
            }
        
        });
     };
    }
    const modalCompra = <>
        <Modal id={"modalCompra"} title={"Comprado "+sessionStorage.getItem("nombreJuego")} visible={true} onCancel={handleCancelCompra}
            footer={[
                <Button type="primary" htmlType="submit" className="register-form-button" onClick={() => comprar()}>
                    Comprar
                </Button>
            ]}>
            <Form name="comprandoForm" >

                <Image preview={false} src="https://www.consumoteca.com/wp-content/uploads/Logo-de-PayPal.jpg" width={350} style={{marginLeft:50}}></Image>

                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: 'Por favor introduce un Email correcto!' }]}>

                    <Input id="emailcompra" className="input" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />

                </Form.Item>

                <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}>

                    <Input.Password id="passcompra" className="input" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña"/>

                </Form.Item>
            </Form>
        </Modal>
    </>

const modalCompra2 = <>
<Modal id={"modalCompra"} title={"Comprando "+sessionStorage.getItem("nombreJuego")} visible={true} onCancel={handleCancelCompra2}
    footer={[
    ]}>
    <Steps>
    <Step status="finish" title="Login" icon={<UserOutlined />} />
    <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
    <Step status="finish" title="Pay" icon={<CheckOutlined />} />
    <Step status="process" title="Done" icon={<SmileOutlined />} />
    </Steps>
</Modal>
</>
/*
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
    });*/

    function buscar(){

        console.log()
        axios.get("https://localhost:7117/api/GameStock/videojuegos", {
           
        }) .then((response) => {
                
            setvideojuegos(response.data);
            var arrayJuegos = [];
            var nombreBuscado = document.getElementById("form1").value;
            var selectIndependiente =document.getElementById("juegoIndependienteSwitch").value;
            console.log(nombreBuscado);
            if (nombreBuscado!=""){
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].nombre);
                if ((response.data[i].nombre).includes(nombreBuscado) && response.data[i].independiente == selectIndependiente) {
                    arrayJuegos.push(response.data[i]);
                }
            }
            console.log(arrayJuegos)
            if (arrayJuegos.length!=0) {
                
                setvideojuegos(arrayJuegos);
            }else if(selectIndependiente){
                setvideojuegos(arrayJuegos);
            }
        }
        })
       
    }    
    return (
        <>
            <div className="m-4 p-2">
                
            {comprando?modalCompra:<></>}
            {comprando2?modalCompra2:<></>}
            <div>
                <div className="field" id="searchform">
                        <Input.Group compact>
                        <Search id="form1" onSearch={() => buscar()} placeholder="Escribe lo que quieras buscar" style={{width:"85%",borderRadius: "20px"}}/>
                        <Button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Filtros de búsqueda
                        </Button>
                        </Input.Group>
                </div>
                    

                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Filtros de búsqueda</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            
                        {/*
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
                        <br></br>
                        <br></br>*/}
                        <label htmlFor="juegoIndependienteSwitch" className="htmlForm-label m-2"> Juegos Independientes : <select id="juegoIndependienteSwitch" name="select"><option value="0">No</option><option value="1">Si</option></select></label>
                        </div>
                    </div>
                </div>
                <div>
                <Row>
                {videojuegos.map(videojuegos => (  
                        <Col span={8} style = { {marginTop: '30px'}}>
                            <Card hoverable style={{ width: 300,borderRadius: "20px"}} cover={ <Image src={videojuegos.imagen} preview={false} style={{borderRadius: "20px"}} id="imgJuegoUsuario" className="mb-4" alt="imagen" height={200}></Image>}>
                            <Meta title={videojuegos.nombre} description={<b style={{color:"black"}}>{videojuegos.precio===0 ?  "Gratis":videojuegos.precio + "€"}</b>}/>
                            
                                <Rate disabled defaultValue={videojuegos.valoracionmedia} style={{fontSize: 20 ,height:"100px" }}/>
                                <Button id="btnComprar" shape="round" onClick={() => {setComprando(true);sessionStorage.setItem("nombreJuego",videojuegos.nombre);sessionStorage.setItem("idJuego",videojuegos.id)}}>Comprar</Button>
                        
                            </Card>
                        </Col>
                    ))}
                    </Row>
                </div>
            </div>
        </>
    );
}