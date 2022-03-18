import React, { useState, useEffect } from "react";
import axios from 'axios';

import $ from "jquery";

import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';

import { Button, Modal, Typography, Input, Image, Form, notification, Tooltip, InputNumber } from 'antd';
const { Paragraph } = Typography;

export default function App() {
    const [error, setError] = useState(null);
    const [videojuegosIndependientes, setVideojuegosIndependientes] = useState([]);
    const [emailVendedor, setEmailVendedor] = useState([]);
    const [subirVideojuegosIndependientes, setSubirVideojuegosIndependientes] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalIndependienteVisible, setIsModalIndependienteVisible] = useState(false);

    const [ellipsis] = React.useState(true);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/devolverJuegosIndependiente", {
            headers: {
                "Authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(
                (videojuegosIndependientes) => {
                    setVideojuegosIndependientes(videojuegosIndependientes.data);
                    console.log(videojuegosIndependientes);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])

    // Funciones del modal para comprar los juegos independientes
    const showModal = (id, titulo, descripcion) => {
        axios.get(`http://localhost:8000/api/devolverEmailVendedor/${id}`)
            .then(
                (emailVendedor) => {
                    setEmailVendedor(emailVendedor.data);
                    console.log(emailVendedor.data);

                    $("#emailVendedor").text(emailVendedor.data);
                },
                (error) => {
                    setError(error);
                }
            )

        $(document).ready(function () {

            $(".ant-modal-title").text(titulo);
            $("#parrafo").text(descripcion); 

        });

        setIsModalVisible(true);
    };

    const cancelar = () => {
        setIsModalVisible(false);
    };

    const mandarNotificacionSubida = type => {
        notification[type]({
            message: 'Confirmación de subida',
            description:
                'La subida del videojuego ha sido realizada correctamente.',
        });
    };

    const mandarNotificacionError = type => {
        notification[type]({
            message: 'Errores de escritura',
            description:
                'Por favor revisa primero los errores de los campos sin rellenar.',
        });
    };

    const mandarNotificacionErrorSubida = type => {
        notification[type]({
            message: 'Error de subida',
            description:
                'Error en la subida del videojuego, identifícate!.',
        });
    };


    // Funciones del modal para subir los juegos independientes
    const showModalIndependiente = () => {
        setIsModalIndependienteVisible(true);
    };

    let errorSubida;
    const subirVideojuego = () => {
        errorSubida = false;

        axios.post("http://localhost:8000/api/registrarJuego", {titulo: document.getElementById("titulo").value,
        idCategoria: document.getElementById("idCategoria").value,
        imagen: document.getElementById("imagen").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        esDestacado: document.getElementById("esDestacado").value,
        emailVendedor: sessionStorage.getItem('email')},
        {
        
            headers: {
                "Authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(
                (subirVideojuegosIndependientes) => {

                    setSubirVideojuegosIndependientes(subirVideojuegosIndependientes.data);
                    console.log(subirVideojuegosIndependientes);

                    window.location.reload();
                }
            )
            .catch(function (error) {
                errorSubida = true;

                console.log("error del catch" + error);
          
            });

        

        setTimeout(function(){

            if(errorSubida){

                mandarNotificacionErrorSubida('error');
    
            }  else {
    
                if ($("input").val() === ""){
    
                    mandarNotificacionError('error');
        
                } else if ($("#subidaIndependientes").children().attr("class") === "ant-row ant-form-item ant-form-item-has-success"){
        
                    mandarNotificacionSubida('success');
        
                    setIsModalIndependienteVisible(false);
        
                }    
            }  
        }, 1000);
        
    };

    const cancelar2 = () => {
        setIsModalIndependienteVisible(false);
    };

    return (
        <>
            <div className="m-4 p-2">
                <div>
                    {/* Modal para obtener más información sobre los juegos independientes */}
                    <Modal id="modalComprar" title="Compar videojuego" centered visible={isModalVisible} onOk={cancelar} onCancel={cancelar} width={1000} cancelText="Cancelar" cancelButtonProps={{ hidden: true }}>
                        <label></label>

                        <br></br>

                        <p style={{ textAlign: "center", fontSize: "20px" }}>Mediante este email podrás contactar con el desarrollador independiente dueño del videojuego</p>
                        <b><p id="emailVendedor" style={{ textAlign: "center", fontSize: "25px" }}></p></b>
                    </Modal>

                    {/* Modal para subir los juegos independientes */}
                    <Modal id="modalSubir" title="Sube tu juego independiente a la plataforma" centered visible={isModalIndependienteVisible} onCancel={cancelar2} width={800} okButtonProps={{ hidden: true }} cancelText="Cancelar">

                        <Form name="subidaIndependientes" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item name="titulo" label="Título del juego"
                                rules={[{ required: true, message: 'Por favor introduce el nombre del juego!' }]}>
                                
                                <Input id="titulo" className="input" style={{ width: '50%' }}/>

                            </Form.Item>

                            <Form.Item name="idCategoria" label="Categoría del juego"
                                rules={[{ required: true, message: 'Por favor introduce la categoría del juego!' }]}>
                                
                                <InputNumber id="idCategoria" min={1} max={4} type="number" className="input" style={{ width: '50%' }}/>

                            </Form.Item>

                            <Form.Item name="imagen" label="Imagen del juego"
                                rules={[{ required: false, type: "url", message: 'Por favor introduce la URL de la imagen!' }]}>
                                
                                <Input id="imagen" suffix={<FileImageOutlined className="input" />} style={{ width: '50%' }}/>

                            </Form.Item>

                            <Form.Item name="descripcion" label="Descripción del juego"
                                rules={[{ required: false, message: 'Por favor introduce la descripción del juego!' }]}>
                                
                                <Input.TextArea id="descripcion" className="input" style={{ width: '50%' }}/>

                            </Form.Item>

                            <Form.Item name="precio" label="Precio del juego"
                                rules={[{ required: true, type: "number",  max: 999, message: 'Por favor introduce el precio del juego!' }]}>
                                
                                <InputNumber id="precio" min={0} max={1000} type="number" className="input" style={{ width: '50%' }}/>

                            </Form.Item>

                            <Form.Item name="esDestacado" label="Juego destacado Sí(1)/No(0)"
                                rules={[{ required: true, type: "number",  max: 999, message: 'Por favor introduce el precio del juego!' }]}>
                                
                                <InputNumber id="esDestacado" min={0} max={1} type="number" className="input" style={{ width: '50%' }}/>

                            </Form.Item>

                            <Form.Item>

                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={subirVideojuego}>
                                    Subir<UploadOutlined></UploadOutlined>
                                </Button>

                            </Form.Item>
                        </Form>

                    </Modal>

                    <div className="row">

                        {videojuegosIndependientes.map(videojuegoIndependiente => (  

                            <div className="col-lg-4 col-md-6">
                                <div class="card m-3">

                                    <Image src={videojuegoIndependiente.imagen} id="imgJuego" className="mb-4 card-img-top" alt="imagen" height={200}></Image>
                                        <div className="card-body">
                                            <h3 className="card-title">{videojuegoIndependiente.titulo}</h3>

                                            

                                            <Paragraph style={{ whiteSpace: "pre-line" }}
                                                ellipsis={
                                                    ellipsis ? {
                                                        rows: 1.5,
                                                        expandable: true,
                                                        symbol: 'leer más',
                                                    } : false
                                                }>
                                                {videojuegoIndependiente.descripcion}
                                            </Paragraph>

                                            <h4>{videojuegoIndependiente.precio}€</h4><Button id="btnComprar" shape="round" onClick={() => {
                                                showModal(videojuegoIndependiente.id, videojuegoIndependiente.titulo, videojuegoIndependiente.precio, videojuegoIndependiente.descripcion)
                                            }}>Más info</Button>

                                        </div>
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>

            </div>

            <Tooltip title="Pulsa aquí para subir tu juego" className="mb-3">
                <Button shape="round" icon={<UploadOutlined />} onClick={showModalIndependiente}>Subir videojuego</Button>
            </Tooltip>
        </>
    );
}