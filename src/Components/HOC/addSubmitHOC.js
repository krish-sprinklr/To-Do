import React, { useCallback } from "react";
import Modal from "../Modal";
import Snackbar from "../Snackbar";

const SUCCESS = "success";

const addSubmitHOC = (Component) => {
  return (props) => {
    const { state, dispatch, type } = props;
    const [modalState, setModalState] = React.useState(false);
    const [snackBar, setSnackBar] = React.useState(false);

    const openModal = useCallback(() => {
      setModalState(true);
    }, []);

    const closeModal = useCallback(() => {
      setModalState(false);
    }, []);

    const openSnackBar = useCallback(() => {
      setSnackBar(true);
    }, []);

    const closeSnackBar = useCallback(() => {
      setSnackBar(false);
    }, []);

    return (
      <>
        <Component {...props} openModal={openModal} />
        {modalState ? (
          <Modal
            onClose={closeModal}
            state={state}
            dispatch={dispatch}
            type={type}
            openSnackBar={openSnackBar}
          />
        ) : null}
        <Snackbar
          type={SUCCESS}
          open={snackBar}
          close={closeSnackBar}
        >{`Added to ${type}`}</Snackbar>
      </>
    );
  };
};

export default addSubmitHOC;
