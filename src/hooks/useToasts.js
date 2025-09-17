import React, { useState, useEffect } from 'react';

const useToasts = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'bg-primary') => {
        const newToast = { id: Date.now(), message, type };
        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const handleClose = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    const ToastContainer = () => (
        <div aria-live="polite" aria-atomic="true" className="position-relative">
            <div className='toast-container position-fixed bottom-0 end-0 p-3' style={{ "zIndex": 1 }}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast show ${toast.type} align-items-center text-white border-0`}
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                    >
                        <div className="d-flex">
                            <div className="toast-body">
                                {toast.message}
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                                onClick={() => handleClose(toast.id)}
                            ></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts((prevToasts) => prevToasts.slice(1));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toasts]);

    return { showToast, ToastContainer };
};

export default useToasts;
