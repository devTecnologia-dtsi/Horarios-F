import uniminutoLogo from "../../assets/uniminuto/logo-para-web.png";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import folder from "../../assets/images/folder.png";
import file from "../../assets/images/file.png";
import { Link, useParams } from "react-router-dom";

const EstudaintesHorario = () => {
    const { id } = useParams();
    const { data, loading } = useFetch(`?horario&id=${id}`, id);
    const { fileInputRef, downloadProgress, handleNavigate, handleUpload, handleDownloadFile, ToastContainer } = useForm();

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="mx-auto text-center">
                    <img className="ms-2" src={uniminutoLogo} />
                </div>
            </nav>
            <div className="container mt-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/estudiantes/horarios'}>Horarios</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"></li>
                    </ol>
                </nav>
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
                                data.map(({ id_carpeta, ruta, id_archivo, nombre_archivo }, index) => (
                                    <div key={index} className="col-md-3">
                                        <div
                                            className="card mb-4 shadow p-3 mb-5 bg-body rounded"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                if (id_carpeta) {
                                                    handleNavigate('estudiantes/carpeta', id_carpeta)
                                                } else {
                                                    handleDownloadFile(id_archivo, nombre_archivo);
                                                }
                                            }}
                                        >
                                            <img
                                                src={id_carpeta ? folder : file}
                                                className="card-img-top"
                                                alt="Imagen"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{id_carpeta ? ruta.replace('_', ' ') : nombre_archivo}</h5>
                                            </div>
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
                                ))
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
                    onChange={(e) => handleUpload(e)}
                />
                <ToastContainer />
            </div>
        </>
    );
}

export default EstudaintesHorario;