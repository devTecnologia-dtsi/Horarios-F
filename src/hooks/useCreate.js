import { useState } from "react";
import useToasts from "./useToasts";
import { postData } from "../services/fetchData";

const useCreate = (setReload) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const { showToast, ToastContainer } = useToasts();
    const [loadingCreate, setLoadingCreate] = useState(false);

    const create = async (formulario, type = 'createFolder', isFolder = null, id = null) => {
        try {

            const formData = new FormData();
            Object.keys(formulario).forEach(function (element) {
                formData.append(element, formulario[element])
            });
            formData.append('type', type);
            formData.append('isFolder', isFolder);
            formData.append('id', id);
            setLoadingCreate(true);

            const result = await postData({ url: `${BASE_URL}/horarios/index.php`, params: formData });
            setLoadingCreate(false);
            if (result.process) {
                setReload(Math.random());
                closeModal();
                showToast(`¡Muy bien!, ${result.message}`, 'bg-success');
            } else {
                showToast(`¡Ups! ${result.message}`, 'bg-danger');
            }

        } catch (error) {
            showToast(`¡Ups! Hubo un error al crear la carpeta`, 'bg-danger')
            console.error(error);
        }
    }

    // Cerrar todos los modales abiertos
    const closeModal = () => {
        var modales = document.querySelectorAll('.modal');
        modales.forEach(function (modal) {
            var instanciaModal = window.bootstrap.Modal.getInstance(modal);
            if (instanciaModal) {
                instanciaModal.hide();
            }
        });
    }

    return {
        create,
        ToastContainer,
        loadingCreate
    };
}

export default useCreate;