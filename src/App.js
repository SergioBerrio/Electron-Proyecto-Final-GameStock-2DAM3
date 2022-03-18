import logo from "./logo.svg"
import React from "react";
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BackTop, Tooltip } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons';


import Tienda from "./components/tienda.component.js";
import Biblioteca from "./components/biblioteca.component.js";
import JuegosIndependientes from "./components/juegosIndependientes.component.js";
import MiPerfil from "./components/miPerfil.component.js";
import Login from "./components/login.component.js";
import Logout from "./components/logout.component.js";
import Register from "./components/registro.component.js";


function App() {
  return (
    <div className="App">
    
      
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                        Tienda
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/biblioteca"} className="nav-link">
                        Biblioteca
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/juegosIndependientes"} className="nav-link">
                        Juegos independientes
                    </Link>
                </li>
                </div>
                <div className="navbar-nav ml-auto">
                    <li id="idLogin" className="nav-item">
                        <Link to={"/miPerfil"} className="nav-link">
                            Mi perfil
                        </Link>
                    </li>
                    <li id="idLogin" className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    </li>
                    <li id="idLogout" className="nav-item">
                        <Link to={"/logout"} className="nav-link">
                            Logout
                        </Link>
                    </li>
                </div>
            </div>
        </nav>

        <div className="contenedor">
            <Routes>
                <Route exact path="/" element={<Tienda/>} />
                <Route exact path="/biblioteca" element={<Biblioteca/>} />
                <Route path="/juegosIndependientes" element={<JuegosIndependientes/>} />
                <Route path="/miPerfil" element={<MiPerfil/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
      </div>

        <BackTop>
            <Tooltip title="Volver arriba">
                <UpCircleTwoTone twoToneColor="#40DC12" style={{ fontSize: '40px' }}/>
            </Tooltip>
        </BackTop>
    </div>
  );
}

export default App;
