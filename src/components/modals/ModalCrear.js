import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";

const ModalCrear = ({ isFolder, id, loadingCreate, type = 'createFolder', title = 'Creación de Carpeta', create }) => {
    const [modal, setModal] = useState();
    const [errors, setErrors] = useState({});
    const { formulario, handleInputChange } = useForm(null, { nombre: '' });
    const { nombre } = formulario;
    const validateForm = () => {
        const newErrors = {};
        if (!formulario.nombre) {
            newErrors.nombre = 'Campo obligatorio';
        }
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            create(formulario, type, isFolder, id, modal);
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    useEffect(() => {
        setModal(new window.bootstrap.Modal(document.getElementById('ModalCrear')));
    }, []);
    return (
        <div className='modal fade' id="ModalCrear" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="staticBackdropLabel">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center d-flex justify-content-around">
                            <div className="row w-100">
                                <div className="col-md-12">
                                    <form className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.nombre && 'is-invalid'}`}
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Nombre de la carpeta"
                                            value={nombre}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="nombre">Nombre de la carpeta</label>
                                        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loadingCreate}
                        >
                            {
                                loadingCreate ?
                                    <div className="align-items-center text-center">
                                        <div className="spinner-border ms-auto spinner-border-sm" role="status" aria-hidden="true"></div>
                                    </div>
                                    :
                                    'Guardar'
                            }
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCrear;