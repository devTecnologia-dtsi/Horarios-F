import file from "../assets/images/file.png";
import { FaTrash } from "react-icons/fa6";
import ModalDelete from "./modals/ModalDelete";
import useForm from "../hooks/useForm";

const CardFile = ({ id_archivo, nombre_archivo, loadingDelete, sendPost }) => {
    const { downloadProgress, handleDownloadFile } = useForm();
    return (
        <>
            <div className="col-md-6 col-lg-3">
                <div className="card mb-4 shadow p-3 mb-5 bg-body rounded">
                    <img
                        src={file}
                        className="card-img-top"
                        alt="Imagen"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDownloadFile(id_archivo, nombre_archivo)}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{nombre_archivo}</h5>
                    </div>
                    <div className="card-footer text-center" style={{ 'backgroundColor': '#fff' }}>
                        <a
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target={`#ModalEliminar${id_archivo}`}
                        >
                            <FaTrash />
                        </a>
                        {downloadProgress > 0 && (
                            <>
                                <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
                                    <small>Descargando...</small>
                                </div>
                                <div className="progress" style={{ height: "30px" }}>
                                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: `${downloadProgress}%` }} aria-valuenow={downloadProgress} aria-valuemin="0" aria-valuemax="100">
                                        {downloadProgress > 0 && <span className="visually-hidden">{downloadProgress}% completado</span>}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <ModalDelete
                    title={'¿Desea eliminar el archivo'}
                    typeToPost={'deleteFile'}
                    id={id_archivo}
                    loadingPost={loadingDelete}
                    sendPost={sendPost}
                />
            </div>
        </>
    );
}

export default CardFile;
