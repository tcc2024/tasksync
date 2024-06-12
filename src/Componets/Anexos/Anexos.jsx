import React, { useState } from 'react'
import styles from './Anexos.module.css'
import addButton from '../../assets/AddButton.svg'
import deleteButton from '../../assets/delete.svg'
import ToastService from '../../services/ToastService'

export default function Anexos({ anexos, adicionarAnexo, excluirAnexo }) {

    const [draggingFile, setDraggingFile] = useState(0);

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        setDraggingFile(0);
        const files = event.dataTransfer.files;        handleFiles(files);
    }

    const handleFileInputChange = (event) => {
        const files = event.target.files;
        handleFiles(files);
    }

    const fileInputRef = React.createRef();
    const handleClick = (bypass) => {

        if (draggingFile > 0) return;
        if (bypass && anexos.length > 0) return;

        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > 25 * 1024 * 1024) {
                    ToastService.Error("O arquivo é maior do que 25MB");
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result;
                    adicionarAnexo(file, base64String);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDraggingFile((prev) => prev + 1);
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDraggingFile((prev) => prev - 1);
    }

    return (
        <div className={styles.container}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <input
                type="file"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
                multiple
                ref={fileInputRef}
            />
            <div className={styles.addButtonContainer}>
                <span>Anexos: </span>
                {anexos.length > 0 &&
                    <div
                        onClick={() => handleClick(false)}
                    >
                        <img src={addButton}></img>
                    </div>
                }
            </div>

            <div className={anexos.length > 0 && draggingFile == false ? styles.content : styles.contentSemAnexo}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => handleClick(true)}
            >
                {draggingFile === 0 &&
                    <div>
                        {
                            anexos.map((anexo) => (
                                <div className={styles.line} key={anexo?.key}>
                                    <div className={styles.lineContent}>
                                        <span>{anexo.nome} </span>
                                        <img onClick={() => excluirAnexo(anexo?.key)} src={deleteButton}></img>
                                    </div>
                                    {anexo?.key !== anexos.length - 1 && <div className={styles.divider}></div>}
                                </div>
                            ))
                        }
                        {
                            anexos.length == 0 &&
                            <div>
                                <img className={styles.imgAdd} src={addButton}></img>
                            </div>
                        }
                    </div>
                }
                {draggingFile > 0 &&
                    <span>Arraste e solte arquivos de até 25MB.</span>
                }
            </div>
        </div >
    )
}


