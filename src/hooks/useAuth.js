import { useState } from 'react';
import { fetchData } from '../services/fetchData';
import { useNavigate } from 'react-router-dom';
import useToasts from './useToasts';

const useAuth = (setIsAuthenticated) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL_DA;
    const BASE_URL_UNIMIUNTO = process.env.REACT_APP_BACKEND_URL;
    const { showToast, ToastContainer } = useToasts();
    const endpoint = '/api/login/index.php';
    const [loading, setLoading] = useState(false);
    const native = useNavigate();

    const login = async (email, password) => {
        try {
            if (!email || !password) {
                showToast('Por favor, complete todos los campos.', 'bg-danger');
                return;
            }
            setLoading(true);
            const permissions = await fetchData({ url: `${BASE_URL_UNIMIUNTO}?permissions&email=${email}` });
            if (!permissions.process) {
                setLoading(false);
                showToast(`¡Ups! ${permissions.message}`, 'bg-danger');
                return false;
            }
            const result = await fetchData({ url: `${BASE_URL}${endpoint}/${email}/${password}` });
            if (result.id == 999) {
                showToast('Usuario o contraseña incorrectas', 'bg-danger');
                setIsAuthenticated(false);
                localStorage.setItem('isAuthenticated', 'false');
                localStorage.setItem('FirstName', null);
            } else {
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('FirstName', result.FirstName);
                showToast('Seccion iniciada', 'bg-primary');
                native('/horarios');
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            showToast('Error al iniciar sesión', 'bg-danger');
            setLoading(false);
        }
    };

    return { loading, login, ToastContainer };
};

export default useAuth;
