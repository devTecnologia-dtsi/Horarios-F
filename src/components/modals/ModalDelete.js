const ModalDelete = ({ title, typeToPost, id, loadingPost, sendPost }) => {
    return (
        <div className='modal fade' id={`ModalEliminar${id}`} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="staticBackdropLabel">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center d-flex justify-content-around">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => sendPost(typeToPost, id)}
                                disabled={loadingPost}
                            >
                                {
                                    loadingPost ?
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-dark m-2" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                        :
                                        'Si'
                                }
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;