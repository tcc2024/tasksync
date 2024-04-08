import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthServices';
import ApiService from '../../services/ApiService';

export default function Home() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        VerificarLogin();
        BuscarDadosUsuario();
    }, []);

    function VerificarLogin() {
        const usuarioEstaLogado = AuthService.VerificarSeUsuarioEstaLogado();
        if (!usuarioEstaLogado) {
            navigate("/");
        }
    }

    async function BuscarDadosUsuario() {
        debugger;
        const response = await ApiService.get('/Usuario/getuserdata');
        if (response.status == 200) {
            setUsuario(response.data)
        }
    }

    return (
        <div>
            <div>Home</div>
            <div>{usuario.id}</div>
        </div>
    );
}