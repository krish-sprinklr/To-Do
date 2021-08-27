import React from "react";
import { deleteCardAction } from "../Reducer/Action";

function Modal(props) {
  const { dispatch, type, id, handleClose } = props;

  const handleDelete = React.useCallback(() => {
    handleClose();
    deleteCardAction(id, type, dispatch);
  }, [dispatch, handleClose, id, type]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-center">
          <strong>Are you sure you want to delete?</strong>
        </h2>
        <div className="display-flex justify-content-center gap-1">
          <button className="input-button" onClick={handleClose}>
            No
          </button>
          <button className="input-button" onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
