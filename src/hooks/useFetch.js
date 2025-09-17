import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData";

const useFetch = (endpoint, id) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [paths, setPaths] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        getData();
    }, [id, reload]);

    useEffect(() => {
        getPaths();
    }, [id]);

    const getPaths = async () => {
        try {
            const result = await fetchData({ url: `${BASE_URL}?ruta&id=${id}` });
            setPaths(result);
        } catch (error) {
            setError(error);
        }
    }
    const getData = async () => {
        try {
            setLoading(true);
            const result = await fetchData({ url: `${BASE_URL}${endpoint}` });
            setData(result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, paths, reload, setError, setReload };
}

export default useFetch;