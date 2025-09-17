// images
import rectoria1 from "../../assets/rectoria/rectoria1.jpg";
import rectoria2 from "../../assets/rectoria/rectoria2.jpg";
import rectoria3 from "../../assets/rectoria/rectoria3.jpg";
import rectoria4 from "../../assets/rectoria/rectoria4.jpg";
import rectoria5 from "../../assets/rectoria/rectoria5.jpg";
import uniminutoLogo from "../../assets/uniminuto/logo-para-web.png";
// hooks
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";

const EstudiantesHorarios = () => {
    const { handleNavigate } = useForm();
    const { data, loading } = useFetch('?horarios');
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
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="mx-auto text-center">
                    <img className="ms-2" src={uniminutoLogo} />
                </div>
            </nav>
            <div className="container mt-4">
                <div className="row">
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
                                                onClick={() => handleNavigate('estudiantes/horario', id)}
                                            >
                                                <img
                                                    src={image}
                                                    className="card-img-top"
                                                    alt="Imagen"
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
            </div>
        </>
    );
}
export default EstudiantesHorarios;