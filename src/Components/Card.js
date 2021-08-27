import React from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export default React.memo(function Card(props) {
  const { id, heading, content } = props.cardData;
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const { dispatch, type, state } = props;
  const openDeleteModal = React.useCallback(() => {
    setDeleteModal(true);
  }, []);
  const closeDeleteModal = React.useCallback(() => {
    setDeleteModal(false);
  }, []);

  const openEditModal = React.useCallback(() => {
    setEditModal(true);
  }, []);
  const closeEditModal = React.useCallback(() => {
    setEditModal(false);
  }, []);

  return (
    <>
      <h3 className="display-inline" aria-label="card-heading">
        {heading}
      </h3>
      <button className="float-right delete-card" onClick={openDeleteModal}>
        <img
          src="https://img.icons8.com/material-rounded/24/000000/delete-sign.png"
          alt="delete"
          height="15px"
        />
      </button>
      <button className="float-right delete-card" onClick={openEditModal}>
        <img
          className="edit-button"
          src="https://img.icons8.com/ios/50/000000/pencil--v1.png"
          height="15px"
          alt="edit"
        />
      </button>
      <p aria-label="card-content" data-testid={`card-content-${id}`}>
        {content && content.length > 0 ? content : null}
      </p>
      {deleteModal && (
        <DeleteModal
          handleClose={closeDeleteModal}
          dispatch={dispatch}
          type={type}
          id={id}
        />
      )}
      {editModal && (
        <EditModal
          id={id}
          state={state}
          dispatch={dispatch}
          type={type}
          onClose={closeEditModal}
          content={content}
          heading={heading}
        />
      )}
    </>
  );
});
