import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Image, Rate } from 'antd';

export default function App() {
    const [error, setError] = useState(null);
    const [videojuegos, setVideojuegos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [resenasUsuario, setResenasUsuario] = useState([]);

    var arrayJuegos = [];

    //const [ellipsis] = React.useState(true);

    useEffect(() => {
        axios.get("https://localhost:7117/api/User/datos/" + sessionStorage.getItem('idUsuario'), {
        
        })
            .then(
                (usuarios) => {
                    setUsuarios(usuarios.data);
                },
                (error) => {
                    setError(error);
                }
            )


        axios.get("https://localhost:7117/api/GameStock/resena/usuario/" + sessionStorage.getItem('idUsuario'), {
    
        }) 
            .then(
                (resenasUsuario) => {
                    setResenasUsuario(resenasUsuario.data);

                    for (let i = 0; i < resenasUsuario.data.length; i++) {
                        
                        axios.get("https://localhost:7117/api/GameStock/videojuego/" + resenasUsuario.data[i].idjuego, {
            
                        })
                            .then(
                                (videojuegos) => {
                                    setVideojuegos(videojuegos.data);

                                    arrayJuegos.push(videojuegos.data[i].nombre);
                                },
                                (error) => {
                                    setError(error);
                                }
                            )
                    }
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])
    

    return (
        <>
            <div className="m-4 p-2">
                {usuarios.map(usuario => (
                    <div>
                        <Image src={usuario.imagen} id="imgUsuario" className="mb-4" alt="imagen" height={200}></Image>

                        <br></br>

                        <b>{usuario.nombre}</b>

                        <br></br>

                        <p>{usuario.descripcion}</p>

                        <br></br>
                        <br></br>

                        {resenasUsuario.map((resenaUsuario, index) => (
                            <div>
                                {arrayJuegos[index]}

                                <br></br>

                                <p>{resenaUsuario.descripcion}</p>

                                <br></br>

                                <label htmlFor="valoracionResena" className="htmlForm-label m-2">Valoración de la reseña: </label>
                                <Rate  id="valoracionResena" disabled={true} defaultValue={resenaUsuario.valoracion} value={resenaUsuario.valoracion}></Rate>
                            </div>
                        ))}

                        {videojuegos.map((videojuego, index) => (
                            <div>
                                <Image src={videojuego.imagen} id="imgJuegoUsuario" className="mb-4" alt="imagen" height={200}></Image>

                                <br></br>

                                <b>{videojuego.nombre}</b>

                                <br></br>

                                <p>{videojuego.descripcion}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}