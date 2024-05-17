import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import ApiService from '../../services/ApiService';
import Multiselect from 'multiselect-react-dropdown';
import ToastService from '../../services/ToastService';
import { toast } from 'react-toastify';

export default function ModalCadastroMateria({ modalAberto, setModalAberto, tarefas, buscarTarefas }) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    Modal.setAppElement('#root');

    const [usuarioAtribuido, setUsuarioAtribuido] = useState([]);
    const [projetoZ, setProjeto] = useState([]);
    const [idProjetoSelecionado, setIdProjetoSelecionado] = useState('');
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    async function Cadastrar(){
        try{
            const body = {
                nome,
                descricao,
                dataEntrega,
                projeto: {
                    id: idProjetoSelecionado
                },
                usuarioAtribuido: {
                    id: usuarioAtribuido
                }
            }

            await ApiService.post("/Tarefa/CriarTarefa")

            setModalAberto(false)
            ToastService.Success("Tarefa Criada com Sucesso")
            await buscarTarefas()
            
        } catch (error) {
            ToastService.Error("Erro ao Criar Tarefa")
        }
    }
        async function BuscarProjetos(){
            try{
                const response = await ApiService.get("/Projeto/listarProjeto")
                setProjeto(response.data)
            } catch(Error) {
                ToastService.Error("Erro Ao Listar Seus Projetos")

            }
        }
    useEffect(() => {
        BuscarProjetos()
    }, [])

    function FecharModal(){
        setModalAberto(false)
    }

    function selectAlterado(event){
        setIdProjetoSelecionado(event.target.value)
    }

    function quandoSelecionadoUsuario(){
        
    }


    
}