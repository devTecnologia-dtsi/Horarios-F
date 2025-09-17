// images
import rectoria from "../assets/images/study.png";
import rectoria1 from "../assets/rectoria/rectoria1.jpg";
import rectoria2 from "../assets/rectoria/rectoria2.jpg";
import rectoria3 from "../assets/rectoria/rectoria3.jpg";
import rectoria4 from "../assets/rectoria/rectoria4.jpg";
import rectoria5 from "../assets/rectoria/rectoria5.jpg";

// hooks
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import useCreate from "../hooks/useCreate";
import useIdleTimeout from "../hooks/useIdleTimeout";


// modals
import ModalCrear from "./modals/ModalCrear";



const Horarios = () => {
    const { data, loading, setReload } = useFetch('?horarios');
    const { handleNavigate, formulario, handleInputChange } = useForm(setReload, { nombre: '' });
    const { loadingCreate, ToastContainer, create } = useCreate(setReload);
    // Cierre de sesión por inactividad
    useIdleTimeout();

    const imageList = [
        rectoria1,
        rectoria2,
        rectoria3,
        rectoria4,
        rectoria5
    ];

    const selectedImage = () => {
        const randomIndex = Math.floor(Math.random() * imageList.length);
        return imageList[randomIndex];
    }

    return (
        <div>
            <div className="container mt-4">
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalCrear"
                    >
                        <img src={rectoria} width={50} />
                    </button>
                </div>
                <div className="row mt-2 " data-masonry='{"percentPosition": true }'>
                    {
                        loading ?
                            (
                                <div className="align-items-center text-center">
                                    <strong>Cargando horarios... </strong>
                                    <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                                </div>

                            ) :
                            data.length > 0 ?
                                data.map(({ id, nombre, descripcion }) => {
                                    const image = selectedImage();
                                    return (
                                        <div key={id} className="col-md-3">
                                            <div
                                                className="card mb-4 shadow p-3 mb-5 bg-body rounded"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleNavigate('horario', id)}
                                            >
                                                <img
                                                    src={image}
                                                    className="card-img-top"
                                                    alt="Imagen"
                                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{nombre}</h5>
                                                    <p className="card-text">{descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="align-items-center text-center">
                                    <strong>Sin informacion </strong>
                                </div>
                    }
                </div>
                <ModalCrear
                    id={null}
                    loadingCreate={loadingCreate}
                    formulario={formulario}
                    type={'createRectory'}
                    title={'Crear Rectoría'}
                    create={create}
                    handleInputChange={handleInputChange}
                />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Horarios;