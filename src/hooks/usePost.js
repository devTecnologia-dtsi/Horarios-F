import { useState } from "react";
import { postData } from "../services/fetchData";
import useToasts from "./useToasts";

const usePost = (setReload) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const { showToast, ToastContainer } = useToasts();
    const [loadingPost, setLoadingPost] = useState(false);

    const sendPost = async (type, id, formulario = null) => {
        try {
            const formData = new FormData();
            if (formulario) {
                Object.keys(formulario).forEach(function (element) {
                    formData.append(element, formulario[element])
                });
            }
            formData.append('id', id);
            formData.append('type', type);
            setLoadingPost(true);
            const result = await postData({ url: `${BASE_URL}`, params: formData });
            closeModal();
            setLoadingPost(false);
            if (result.process) {
                showToast(result.message, 'bg-success');
                setReload(Math.random());
            } else {
                showToast(result.message, 'bg-danger');
            }

        } catch (error) {
            showToast('¡Ups! Hubo un error al ejecutar la acción', 'bg-danger');
            setLoadingPost(false);
            console.error(error);
        }
    }

    // Cerrar todos los modales abiertos
    function closeModal() {
        var modales = document.querySelectorAll('.modal');
        modales.forEach(function (modal) {
            var instanciaModal = window.bootstrap.Modal.getInstance(modal);
            if (instanciaModal) {
                instanciaModal.hide();
            }
        });
    }

    return {
        sendPost,
        ToastContainer,
        loadingPost
    };
}
export default usePost;