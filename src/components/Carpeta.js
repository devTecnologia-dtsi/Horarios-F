import React from "react";
import { Link, useParams } from "react-router-dom";
// assets
import newFolder from "../assets/images/new-folder.png";
import uploadFile from "../assets/images/upload.png";
// components 
import CardFolder from "./CardFolder";
import CardFile from "./CardFile";
import ModalCreate from "./modals/ModalCrear";
// hooks
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import useCreate from "../hooks/useCreate";
import usePost from "../hooks/usePost";
import useIdleTimeout from "../hooks/useIdleTimeout";

const Carpeta = () => {
    // Cierre de sesión por inactividad
    useIdleTimeout();
    
    const { id } = useParams();
    const { data, loading, paths, setReload } = useFetch(`?carpeta&id=${id}`, id);
    const { loadingCreate, create, ToastContainer } = useCreate(setReload);
    const { sendPost, loadingPost, ...rest } = usePost(setReload);
    const {
        fileInputRef,
        formulario,
        loadingForm,
        downloadProgress,
        handleNavigate,
        handleUploadFile,
        handleUpload,
        handleDownloadFile,
        handleInputChange,
        setFormulario,
        ...form
    } = useForm(setReload, { nombre: '' });

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/horarios'}>Horarios</Link></li>
                        {
                            paths.map(({ nombre_ruta, id_ruta }, index, array) => {
                                return (
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                        key={id_ruta}
                                    >
                                        {
                                            index === array.length - 1
                                                ?
                                                nombre_ruta
                                                :
                                                <Link to={`/carpeta/${id_ruta}`}>{nombre_ruta}</Link>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ol>
                </nav>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalCrear"
                    >
                        <img src={newFolder} width={50} />
                    </button>
                    <button
                        className="btn btn-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Subir Archivo"
                        disabled={loadingForm}
                        onClick={handleUploadFile}
                    >
                        {
                            loadingForm
                                ?
                                <div className="spinner-border text-dark ms-auto" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                                :
                                <img src={uploadFile} width={50} />
                        }

                    </button>
                </div>
            </div>
            <div className="row mt-3">
                {
                    loading ?
                        (
                            <div className="align-items-center text-center">
                                <strong>Cargando horarios... </strong>
                                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                            </div>
                        ) :
                        data.length > 0
                            ?
                            data.map(({ id_carpeta, id_archivo, ruta, nombre_archivo }, index) => {
                                if (id_carpeta) {
                                    return (
                                        <CardFolder
                                            key={index}
                                            formulario={formulario}
                                            id_carpeta={id_carpeta}
                                            ruta={ruta}
                                            loadingPost={loadingPost}
                                            navigate={'carpeta'}
                                            handleNavigate={handleNavigate}
                                            setReload={setReload}
                                            sendPost={sendPost}
                                            setFormulario={setFormulario}
                                            handleInputChange={handleInputChange}
                                        />
                                    );
                                } else {
                                    return (
                                        <CardFile
                                            key={index}
                                            nombre_archivo={nombre_archivo}
                                            id_archivo={id_archivo}
                                            loadingPost={loadingPost}
                                            setReload={setReload}
                                            sendPost={sendPost}
                                        />
                                    );
                                }
                            })
                            :
                            <div className="align-items-center text-center">
                                <strong>Sin informacion </strong>
                            </div>

                }
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleUpload(e, id)}
            />
            <ModalCreate
                formulario={formulario}
                handleInputChange={handleInputChange}
                create={create}
                isFolder={true}
                id={id}
                loadingCreate={loadingCreate}
            />
            <ToastContainer />
            <rest.ToastContainer />
            <form.ToastContainer />
        </div>
    );
}

export default Carpeta;