import React,{useState} from "react";
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { BackTop, Tooltip, Form, Input, Button, Modal,InputNumber,Select} from 'antd';
import { UpCircleTwoTone, LockOutlined, MailOutlined, UserOutlined,UploadOutlined,FileImageOutlined } from '@ant-design/icons';

import Tienda from "./components/tienda.component.js";
import Biblioteca from "./components/biblioteca.component.js";
import MiPerfil from "./components/miPerfil.component.js";

function App() {

    const [loginVisible, setloginVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleRegistro, setIsModalVisibleRegistro] = useState(false);
    const [modal, setModal] = useState(true);
    const [isModalIndependienteVisible, setIsModalIndependienteVisible] = useState(false);

    const { Option } = Select;

    const showModalRegistro = () => {
        setIsModalVisibleRegistro(true);
        setModal(false);
    };

    const showModalLogin = () => {
        setIsModalVisible(true);
        setModal(true);
    };

    const handleCancelLogin = () => {
        setIsModalVisible(false);
    };

    const handleCancelRegistro = () => {
        setIsModalVisibleRegistro(false);
    };

    const showModalIndependiente = () => {
        setIsModalIndependienteVisible(true);
    };
    
    const cancelar2 = () => {
        setIsModalIndependienteVisible(false);
    };

    function subirVideojuego(){
        
        var nombre = document.getElementById("titulo").value;
        var precio = document.getElementById("precio").value;
        var cantidad = 55;
        var valoracionmedia = 3;
        var categoria = document.getElementById("categoria").value;
        var imagen = document.getElementById("imagen").value;
        var descripcion = document.getElementById("descripcion").value;

        axios.post('https://localhost:7117/api/GameStock/videojuegosIndependientes/insertar/'+sessionStorage.getItem("idUsuario"), {
            NOMBRE: nombre,
            PRECIO: precio,
            CANTIDAD: cantidad,
            VALORACIONMEDIA: valoracionmedia,
            CODCATEGORIA: categoria,
            IMAGEN: imagen,
            DESCRIPCION: descripcion,
            INDEPENDIENTE: 1,
        })
            .then((response) => {
                console.log(response)
            })
    }
    //funciones de Login
    function conexionLogin() {

        console.log(document.getElementById("emaillogin").value)
        console.log(document.getElementById("passwordlogin").value)
        axios.post('https://localhost:7117/api/User/login', {
            NOMBRE: "A",
            EMAIL: document.getElementById("emaillogin").value,
            CONTRASENA: document.getElementById("passwordlogin").value,
            IMAGEN: "A",
            DESCRIPCION: "A",
        })
            .then((response) => {
                console.log(response);
                if (response.data!= -1){
                    sessionStorage.setItem("idUsuario",response.data);
                    setloginVisible(true);
                }
            })

            handleCancelLogin();

    }

    //Funciones de registro
    function conexionRegistro() {
        axios.post('https://localhost:7117/api/User/registro', {
            NOMBRE: document.getElementById("nombreregistro").value,
            EMAIL: document.getElementById("emailregistro").value,
            CONTRASENA: document.getElementById("passwordregistro").value,
            IMAGEN: "",
            DESCRIPCION: "",
        })
            .then((response) => {
              console.log(response.data);
              
              sessionStorage.setItem("idUsuario",response.data.id);
            })

            setIsModalVisibleRegistro(false);
            setloginVisible(true);
    }

    function logout() {
        axios.put('https://localhost:7117/api/User/logout/'+sessionStorage.getItem("idUsuario"), {
            
        })
            .then((response) => {
                console.log(response);
                sessionStorage.removeItem("idUsuario");
                sessionStorage.removeItem("idJuego");
                sessionStorage.removeItem("nombreJuego");
                setloginVisible(false);
            })

    }
    const modalLogin = <>
        <Modal title="Formulario de Login" visible={isModalVisible} onCancel={handleCancelLogin}
            footer={[
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={conexionLogin}>
                        Iniciar sesión
                </Button>,
                <Button type="primary" className="login-form-button" onClick={showModalRegistro}>
                    ¿Eres nuevo? Regístrate
                </Button>
            ]}>

            <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
            
                <Form.Item name="email" label="Email"
                    rules={[{ required: true, type: "email", message: 'Por favor introduce un Email correcto!' }]}>

                    <Input id="emaillogin" prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
            
                </Form.Item>

                <Form.Item name="password" label="Contraseña"
                    rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}>

                    <Input.Password id="passwordlogin" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña"
                    />

                </Form.Item>
            </Form>
        </Modal>
    </>

    const modalRegistro = <>
        <Modal title="Formulario de Registro" visible={isModalVisibleRegistro} onCancel={handleCancelRegistro}
            footer={[
                <Button type="primary" htmlType="submit" className="register-form-button" onClick={conexionRegistro}>
                    Registrar
                </Button>,
                <Button type="primary" className="login-form-button"  onClick={showModalLogin}>
                    ¿Ya estás registrado? Inicia sesión
                </Button>
            ]}>
            <Form name="normal_register" initialValues={{ remember: true }}>

                <Form.Item name="nombreregistro" label="Nombre" rules={[{ required: true, message: 'Por favor introduce un nombre correcto!' }]}>

                    <Input id="nombreregistro" className="input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />

                </Form.Item>

                <Form.Item name="emailregistro" label="Email" rules={[{ required: true, type: "email", message: 'Por favor introduce un Email correcto!' }]}>

                    <Input id="emailregistro" className="input" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />

                </Form.Item>

                <Form.Item name="passwordregistro" label="Contraseña" rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}>

                    <Input.Password id="passwordregistro" className="input" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña"/>

                </Form.Item>
            </Form>
        </Modal>
    </>

   
    const logueado =   <>
    <li className="nav-item">
    <a className="nav-link " aria-current="page" href="/Miperfil">Mi Perfil</a>
    </li>
    <li className="nav-item">
    <a className="nav-link" aria-current="page" onClick={logout}>Logout</a>
    </li>
    </>;

    return (
        <div className="App">
             {/* Modal para subir los juegos independientes */}
            <Modal id="modalSubir" title="Sube tu juego independiente a la plataforma" centered visible={isModalIndependienteVisible} onCancel={cancelar2} width={800} okButtonProps={{ hidden: true }} cancelText="Cancelar">

            <Form name="subidaIndependientes">
                <Form.Item name="titulo" label="Título del juego"
                    rules={[{ required: true, message: 'Por favor introduce el nombre del juego!' }]}>
                    
                    <input id="titulo" className="input" style={{ width: '50%' }} value=""/>

                </Form.Item>

                <Form.Item name="idCategoria" label="Categoría del juego"
                    rules={[{ required: true, message: 'Por favor introduce la categoría del juego!' }]}>
                    
                    <select id="categoria" style={{ width: 120 }} >
                    <option value="2">MMO</option>
                    <option value="3">Survival</option> 
                    <option value="4">Aventura</option>
                    <option value="5">Accion</option>
                    <option value="6">Shooter</option>
                    <option value="7">Mundo Abierto</option>
                    </select>
                </Form.Item>

                <Form.Item name="imagen" label="Imagen del juego"
                    rules={[{ required: false, message: 'Por favor introduce la URL de la imagen!' }]}>
                    
                    <input id="imagen" suffix={<FileImageOutlined className="input" />} style={{ width: '50%' }}/>

                </Form.Item>

                <Form.Item name="descripcion" label="Descripción del juego"
                    rules={[{ required: false, message: 'Por favor introduce la descripción del juego!' }]}>
                    
                    <input id="descripcion" className="input" style={{ width: '50%' }}/>

                </Form.Item>

                <Form.Item name="precio" label="Precio del juego"
                    rules={[{ required: true, type: "number",  max: 999, message: 'Por favor introduce el precio del juego!' }]}>
                    
                    <input type="number" id="precio" min={0} max={500} className="input" style={{ width: '50%' }}/>

                </Form.Item>

                <Form.Item>

                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={subirVideojuego}>
                        Subir<UploadOutlined></UploadOutlined>
                    </Button>

                </Form.Item>
            </Form>

            </Modal>
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav nav-dark me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                    <a className="nav-link" aria-current="page" href="/">Tienda</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/biblioteca">Biblioteca</a>
                    </li>
                   {loginVisible ? <li className="nav-item">
                        <a className="nav-link" icon={<UploadOutlined />} onClick={showModalIndependiente}>Subir videojuego</a>
                    
                    </li>:<></>
                    }
                </ul>
    
                <form className="d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    {loginVisible
                        ? logueado
                        :   
                        <li className="nav-item" onClick={showModalLogin}>
                            <a className="nav-link " aria-current="page" >Login</a>
                        </li>
                    }
                      
                    </ul>
                </form>
                </div>
            </div>
            </nav>

            <div className="contenedor">
                <Routes>
                    <Route exact path="/" element={<Tienda/>} />
                    <Route exact path="/biblioteca" element={<Biblioteca/>} />
                    <Route path="/miPerfil" element={<MiPerfil/>} />
                </Routes>
            </div>
        </div>

        {modal?modalLogin:modalRegistro}
      
            <BackTop>
                <Tooltip title="Volver arriba">
                    <UpCircleTwoTone twoToneColor="#40DC12" style={{ fontSize: '40px' }}/>
                </Tooltip>
            </BackTop>
        </div>
    );
    }

export default App;
