import { useState } from "react";

const ModalEdit = ({ formulario, title, typeToPost, id, loadingPost, sendPost, handleInputChange }) => {
    const [errors, setErrors] = useState({ nombre: '' });
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
            sendPost(typeToPost, id, formulario);
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    const handleChange = (e) => {
        handleInputChange(e);
    }
    return (
        <div className='modal fade' id={`ModalEditar${id}`} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                            value={nombre.replaceAll('_', ' ')}
                                            onChange={handleChange}
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
                            disabled={loadingPost}
                        >
                            {
                                loadingPost ?
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border text-dark m-2" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
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

export default ModalEdit;