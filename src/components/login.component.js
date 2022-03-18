import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import $ from "jquery";

import { Form, Input, Button, Divider, notification } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

export default function App() {
    const [error, setError] = useState(null);

    function conexion() {

        axios.post('http://localhost:7117/api/login', {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
            .then((response) => {
                console.log(response);
                if(response.data.status==="success"){
                    
                    sessionStorage.setItem('email', document.getElementById("email").value);
                    sessionStorage.setItem("token", response.data.token); 
                    window.location.href = "/";
                    
                }else{
                    mandarNotificacionErrorConfirmacion('error');
                }
            })

        if ($("input").val() === "") {
            mandarNotificacionError('error');

        }
    }

    const mandarNotificacionError = type => {
        notification[type]({
          message: 'Errores de escritura',
          description:
            'Por favor revise primero los errores de los campos sin rellenar.',
        });
    };

    const mandarNotificacionErrorConfirmacion = type => {
        notification[type]({
          message: 'Error de confirmación',
          description:
            'Por favor confirme primero el email para poder inciar sesión.',
        });
    };

    return (
     <div> 

        <legend>
            <h2 style={{color: "white"}}>Formulario de Login</h2>
        </legend>
        
        <div id="contenedor">
            <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
            
                <Form.Item name="email" label="Email"
                    rules={[{ required: true, type: "email", message: 'Por favor introduce un Email correcto!' }]}>

                    <Input id="email" prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
            
                </Form.Item>

                <Form.Item name="password" label="Contraseña"
                    rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}>

                    <Input.Password id="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña"
                    />

                </Form.Item>

                <Divider/>

                <Form.Item style={{textAlign: "right"}}>

                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={conexion}>
                        Iniciar sesión
                    </Button>

                    <Button type="primary" href="/register" className="login-form-button ml-3">
                        ¿¿Eres nuevo?? Regístrate
                    </Button>

                </Form.Item>
            </Form>
        </div>
    </div> 
  );
}