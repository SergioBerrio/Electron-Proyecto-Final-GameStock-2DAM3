import React, { useState } from "react";
import axios from 'axios';
import {BrowserRouter as Router, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default function App() {
    //const [error, setError] = useState(null);
    function conexion() {
        axios.post('http://localhost:7117/api/logout',{},{headers: {
            "Authorization": 'Bearer ' + sessionStorage.getItem('token')
        }})
            .then((response) => {
                console.log(response);
                if(response.data.status==="success"){
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("email");
                    window.location.href = "/";
                }
            })
    }

    return (
        <Router> 
            <div onLoad={conexion()}></div>
        </Router>  
  );
}