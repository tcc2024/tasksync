import React, { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import ToastService from "../../../services/ToastService";
import Modal from "react-modal";
import Multiselect from "multiselect-react-dropdown";
import styles from "./ModalEditarTarefa.module.css";
import Anexos from "../../Anexos/Anexos";


export default function ModalEditarTarefa({
    modalAberto,
    setModalAberto,
    refresh
}) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
            border: "none",
        },
    };
    Modal.setAppElement("#root");

    const [usuarios, setUsuarios] = useState([]);
    const [usuariosAtribuido, setUsuariosAtribuido] = useState([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [anexos, setAnexos] = useState([]);

    async function adicionarAnexo(file, base64) {
        if (anexos.length == 4) {
            ToastService.Error("Limite de 4 anexos atingido!");
            return;
        }

        const novoAnexo = {
            id: 0,
            nome: file.name.replace(/\.[^.]+$/, ""),
            base64,
            key: anexos.length
        }

        setAnexos([...anexos, novoAnexo]);
    }

    async function excluirAnexo(key) {
        const anexo = anexos.find(anexo => anexo.key !== key);

        if (anexo?.id !== 0) {
            console.log('remover do backend');
        }

        let novosAnexos = anexos.filter(anexo => anexo.key !== key);
        novosAnexos = novosAnexos.map((anexo, index) => {
            anexo.key = index;
            return anexo;
        });

        setAnexos(novosAnexos);
    }

    async function Editar() {
        try {
            const body = {
                nome,
                descricao,
                dataEntrega,
                usuariosAtribuidos: usuariosAtribuido.map((usuario) => usuario.id),
            };

            await ApiService.post("/Tarefa/EditarTarefa", body);
            setModalAberto(false);
            ToastService.Success("Tarefa Editada com Sucesso");
            refresh();
        } catch (error) {
            ToastService.Error("Erro ao Editada Tarefa");
        }
    }
    async function BuscarUsuarios() {
        try {
            const response = await ApiService.get("/Usuario/listarUsuarios");
            setUsuarios(response.data);
        } catch (error) {
            ToastService.Error("Erro ao Listar Usuários");
        }
    }
    function FecharModal() {
        setModalAberto(false);
    }

    function quandoSelecionadoUsuario(selectedList, selectedItem) {
        setUsuariosAtribuido([...usuariosAtribuido, selectedItem]);
    }

    function quandoRemoverUsuario(selectedList, removedItem) {
        setUsuariosAtribuido(
            usuariosAtribuido.filter((usuario) => usuario.id !== removedItem.id)
        );
    }

    useEffect(() => {
        BuscarUsuarios();
    }, []);

    return (
        <Modal
            isOpen={modalAberto}
            style={customStyles}
            contentLabel="Example Modal"
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={FecharModal}
        >
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.titulo}>
                        <span>Editar Tarefa</span>
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputNome}>
                            <p className={styles.nomeDescTarefa}>Nome da Tarefa</p>
                            <input
                                className={styles.input}
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputDesc}>
                            <p className={styles.nomeDescTarefa}>Descrição da Tarefa</p>
                            <input
                                className={styles.input}
                                placeholder="Descrição"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>


                    </div>

                    <div className={styles.inputData}>
                        <p className={styles.nomeDescTarefa}>Data de Entrega</p>
                        <input
                            placeholder="Data de Entrega"
                            type="date"
                            value={dataEntrega}
                            onChange={(e) => setDataEntrega(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputUsuarios}>
                        <p className={styles.nomeDescTarefa}>Usuários Atribuídos</p>
                        <Multiselect
                            options={usuarios}
                            placeholder="Selecione ao menos um usuário para a tarefa"
                            selectedValues={usuariosAtribuido}
                            onSelect={quandoSelecionadoUsuario}
                            onRemove={quandoRemoverUsuario}
                            displayValue="nome"
                        />
                    </div>

                    <div className={styles.anexosContainer}>
                        <Anexos anexos={anexos} adicionarAnexo={adicionarAnexo} excluirAnexo={excluirAnexo}></Anexos>
                    </div>

                    <div className={styles.botaoCadastrar}>
                        <center>
                            <button className={styles.button} onClick={Editar}>
                                Editar
                            </button>
                        </center>
                    </div>


                </div>
                <div className={styles.right}>
                    <div className={styles.textoRight}>
                        <p className={styles.tituloRight}>
                            Crie uma tarefa para gerenciar e organizar suas atividades
                        </p>
                    </div>
                </div>


            </div>
        </Modal>
    )
}
