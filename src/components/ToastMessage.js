import React from 'react';

const ToastMessage = ({ message, type = 'bg-primary', show, setShow }) => {
    const toastClass = `toast ${show ? 'show' : ''}`;
    return (
        <div className='toast-container'>
            <div
                className={`${toastClass} ${type} align-items-center text-white border-0 position-absolute bottom-0 end-0 p-3`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body">
                        {message}
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={() => setShow(false)}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default ToastMessage;
