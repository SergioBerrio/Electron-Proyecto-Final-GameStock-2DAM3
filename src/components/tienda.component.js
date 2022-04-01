import React, { useState, useEffect } from "react";
import axios from 'axios';

import $ from "jquery";

import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';

import { Button, Modal, Typography, Input, Image, Form, notification, Tooltip, InputNumber } from 'antd';
const { Paragraph } = Typography;

export default function App() {
    const [error, setError] = useState(null);
    const [tienda, settienda] = useState([]);

    const [ellipsis] = React.useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/api/devolverJuegosIndependiente", {
            headers: {
                "Authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(
                (tienda) => {
                    settienda(tienda.data);
                    console.log(tienda);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])

    return (
        <>
            <div className="m-4 p-2">
                <div>
               
                    
                </div>
            </div>
        </>
    );
}