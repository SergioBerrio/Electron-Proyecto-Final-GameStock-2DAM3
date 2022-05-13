import React, { useState, useEffect } from "react";
import axios from 'axios';

import { EditOutlined,UserOutlined,MailOutlined,LockOutlined,FileImageOutlined} from '@ant-design/icons';
import { Button, Switch,Modal, Typography, Input, Image ,Card, Col, Row, Space,Rate,Divider,Form ,Steps} from 'antd';

export default function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(false);

    //const [ellipsis] = React.useState(true);

    useEffect(() => {
        axios.get("https://localhost:7117/api/User/datos/" + sessionStorage.getItem('idUsuario'), {
        
        })
            .then(
                (usuarios) => {
                    setUsuarios(usuarios.data);
                },
                (error) => { 
                }
            )
    }, [])

    const handleCancel = () => {
        setEditando(false);
    };

    const modalEditar = <>
    <Modal title="Edita tus datos" visible={editando} onCancel={handleCancel}
        footer={[
            <Button type="primary" htmlType="submit" className="register-form-button" onClick={editarUsuario}>
                Confirmar
            </Button>
        ]}>
        <Form name="normal_register" initialValues={{ remember: true }}>

            <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Por favor introduce un nombre correcto!' }]}>

                <Input id="nombre" className="input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />

            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: 'Por favor introduce un Email correcto!' }]}>

                <Input id="email" className="input" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />

            </Form.Item>

            <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}>

                <Input.Password id="password" className="input" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña"/>

            </Form.Item>
            <Form.Item name="imagen" label="Imagen" rules={[{ required: true, message: 'Por favor introduce tu url de foto!' }]}>

                <Input id="imagen" className="input" prefix={<FileImageOutlined className="site-form-item-icon" />} placeholder="Foto"/>

            </Form.Item>

            <Form.Item name="descripcion" label="Descripcion" rules={[{ required: true, message: 'Por favor introduce una descripcion correcto!' }]}>

                <Input id="descripcion" className="input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />

            </Form.Item>

        </Form>
    </Modal>
</>

    function editarUsuario(){
        console.log(document.getElementById("nombre").value)
        console.log(document.getElementById("email").value)
        console.log(document.getElementById("password").value)
        console.log(document.getElementById("imagen").value)
        console.log(document.getElementById("descripcion").value)

        axios.put('https://localhost:7117/api/User/actualizar/'+sessionStorage.getItem("idUsuario"), {
            NOMBRE: document.getElementById("nombre").value,
            EMAIL: document.getElementById("email").value,
            CONTRASENA: document.getElementById("password").value,
            IMAGEN: document.getElementById("imagen").value,
            DESCRIPCION: document.getElementById("descripcion").value
        })
            .then((response) => {
                console.log(response);
            })
        
    }
    return (
        <>
        {editando?modalEditar:<></>}
        
            <div className="m-4 p-2">
                {usuarios.map(usuario => (
                    <Card hoverable style={{ width: 1100 ,height:600,float:"left" }} cover={<Image preview={false} src={usuario.imagen} id="imgUsuario" className="mb-4" alt="imagen" style={{ width: 400 ,height:300 }}></Image>}>
                     <h1 width={60}>{usuario.nombre}</h1>
                     <p><b>Descripción:</b>{usuario.descripcion}</p> 
                     <p><b>Email: </b>{usuario.email}</p>
                     <Button type="primary" onClick={() => setEditando(true)}>Editar</Button>
        
                    </Card>
                ))} 
            </div>
        </>
    );
}