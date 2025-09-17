import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import folder from "../assets/images/folder.png";
import ModalDelete from "./modals/ModalDelete";
import ModalEdit from "./modals/ModalEdit";

const CardFolder = ({
    formulario,
    ruta,
    id_carpeta,
    loadingPost,
    navigate,
    handleNavigate,
    sendPost,
    handleInputChange,
    setFormulario
}) => {

    return (
        <div className="col-md-6 col-lg-3">
            <div className="card mb-4 shadow p-3 mb-5 bg-body rounded">
                <img
                    src={folder}
                    className="card-img-top"
                    alt="Imagen"
                    onClick={() => handleNavigate(navigate, id_carpeta)}
                    style={{ cursor: 'pointer' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{ruta.replaceAll('_', ' ')}</h5>
                </div>
                <div className="card-footer text-center" style={{'backgroundColor': '#fff'}}>
                    <div className="d-flex justify-content-between">
                        <a
                            type="button"
                            className="btn btn-primary w-100 me-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#ModalEditar${id_carpeta}`}
                            onClick={() => { setFormulario({ ...formulario, nombre: ruta }) }}
                        >
                            <AiFillEdit />
                        </a>
                        <a
                            type="button"
                            className="btn btn-danger w-100"
                            data-bs-toggle="modal"
                            data-bs-target={`#ModalEliminar${id_carpeta}`}
                        >
                            <FaTrash />
                        </a>
                    </div>
                </div>
            </div>
            <ModalDelete
                title={'¿Desea eliminar la carpeta?'}
                id={id_carpeta}
                isFolder={true}
                loadingPost={loadingPost}
                sendPost={sendPost}
                typeToPost={'deleteFolder'}
            />
            <ModalEdit
                formulario={formulario}
                title={'Edición de Carpetas'}
                id={id_carpeta}
                isFolder={true}
                loadingPost={loadingPost}
                sendPost={sendPost}
                typeToPost={'editFolder'}
                handleInputChange={handleInputChange}
            />
        </div>
    );
}

export default CardFolder;