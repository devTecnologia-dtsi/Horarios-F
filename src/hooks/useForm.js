import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToasts from "./useToasts";

const useForm = (setReload, initState = null) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const [formulario, setFormulario] = useState(initState);
    const { showToast, ToastContainer } = useToasts();
    const [loadingForm, setLoadingForm] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const fileInputRef = useRef(null);
    const native = useNavigate();

    useEffect(() => {
        setFormulario(formulario);
    }, [formulario]);

    const handleInputChange = (e, specialCharacters = false) => {
        const { name, value } = e.target;
        if (!specialCharacters) {
            let newValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            newValue = newValue.replaceAll(/[^a-zA-Z0-9\s]/g, '');
            setFormulario({ ...formulario, [name]: newValue });
            return true;
        }
        setFormulario({ ...formulario, [name]: value });
    };

    const handleUploadFile = () => {
        fileInputRef.current.click();
    };

    const handleNavigate = (ruta, id) => {
        native(`/${ruta}/${id}`);
    }

    const logout = () => {
        localStorage.setItem('isAuthenticated', 'false');
        native('/login');
    }

    const handleUpload = (e, id, isFolder = true) => {
        if (e.target.files[0]) {
            // se valida la extension del archivo
            const { name } = e.target.files[0];
            const regex = /^.*\.(doc|DOC|pdf|PDF|xlsx|XLSX|docx|DOCX)$/;
            const found = name.match(regex);
            if (!found) {
                showToast('El archivo debe ser word, excel o pdf', 'bg-danger');
                return false;
            }
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            formData.append('id', id);
            formData.append('isFolder', isFolder);
            showToast('Un momento el archivo se esta cargando', 'bg-warning');
            setLoadingForm(true);
            fetch(`${BASE_URL}?upload`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then(({ message, process }) => {
                    setLoadingForm(false);
                    if (process) {
                        showToast('¡Muy bien! El archivo se guardo con exito', 'bg-success');
                        setReload(message + Math.random());
                    } else {
                        showToast(`¡Ups! ${message}`, 'bg-warning');
                    }
                    e.target.value = "";
                })
                .catch((error) => {
                    setLoadingForm(false);
                    showToast('¡Ups! Hubo un error al cargar el archivo', 'bg-danger');
                    console.error(error);
                    e.target.value = "";
                });
        }

    };

    const handleDownloadFile = async (idFile, nameFile) => {
        showToast('Se está descargando el documento', 'bg-warning');
        setLoadingForm(true);

        try {
            const response = await fetch(`${BASE_URL}?download&id=${idFile}`);
            if (!response.ok) {
                const { message } = await response.json();
                showToast(message, 'bg-warning');
                setLoadingForm(false);
                return;
            }

            const total = parseInt(response.headers.get('content-length'), 10);
            let loaded = 0;

            const reader = response.body.getReader();

            const chunks = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                loaded += value.length;

                // Calcular y actualizar el progreso
                const percentComplete = (loaded / total) * 100;
                setDownloadProgress(parseInt(percentComplete));
            }

            // Combinar fragmentos en un Blob
            const blob = new Blob(chunks);

            // Crear un enlace de descarga y simular un clic
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = nameFile;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            showToast('¡Muy bien! se descargó el archivo con éxito', 'bg-success');
            setDownloadProgress(0); // Restablecer la barra de progreso después de la descarga
        } catch (error) {
            showToast('Hubo un error al descargar el documento', 'bg-danger');
            setDownloadProgress(0);
        } finally {
            setLoadingForm(false);
        }
    };


    return {
        handleInputChange,
        setFormulario,
        handleUploadFile,
        logout,
        handleNavigate,
        handleUpload,
        handleDownloadFile,
        ToastContainer,
        loadingForm,
        formulario,
        downloadProgress,
        fileInputRef
    }

}

export default useForm;