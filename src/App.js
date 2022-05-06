import logo from "./logo.svg"
import React,{useState, useEffect} from "react";
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { BackTop, Tooltip, Form, Input, Button, Divider, notification, Modal, loading } from 'antd';
import { UpCircleTwoTone, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import Tienda from "./components/tienda.component.js";
import Biblioteca from "./components/biblioteca.component.js";
import JuegosIndependientes from "./components/juegosIndependientes.component.js";
import MiPerfil from "./components/miPerfil.component.js";

function App() {

    const [loginVisible, setloginVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [idUser, setidUser] = useState();
    const [isModalVisibleRegistro, setIsModalVisibleRegistro] = useState(false);
    const [modal, setModal] = useState(true);

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
                sessionStorage.setItem("idUsuario",response.data);
            })

            handleCancelLogin();

            setloginVisible(true);
    }

    //Funciones de registro
    function conexionRegistro() {
        axios.post('http://localhost:7117/api/register', {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
            .then((response) => {
                console.log(response);
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

                <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Por favor introduce un nombre correcto!' }]}>

                    <Input id="nombre" className="input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />

                </Form.Item>

                <Form.Item name="fechaNacimiento" label="Fecha de nacimineto" rules={[{ required: true, message: 'Por favor introduce una fecha de nacimiento correcta!' }]}>

                    <Input id="fehchaNacimiento" type={"date"} className="input" />

                </Form.Item>

                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: 'Por favor introduce un Email correcto!' }]}>

                    <Input id="email" className="input" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />

                </Form.Item>

                <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}>

                    <Input.Password id="password" className="input" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña"/>

                </Form.Item>
            </Form>
        </Modal>
    </>

    const logueado =   <>
    <li className="nav-item">
    <a className="nav-link " aria-current="page" href="/Miperfil">Mi Perfil</a>
    </li>
    <li className="nav-item">
    <a className="nav-link" aria-current="page" href="/login">Logout</a>
    </li>
    </>;

    return (
        <div className="App">
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
                    <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/juegosIndependientes">Juegos Independientes</a>
                    </li>
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
                    <Route path="/juegosIndependientes" element={<JuegosIndependientes/>} />
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
