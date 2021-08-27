import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import Modal from "../Modal";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("Modal component must open Snack bar and dispatch the data to update the state and close itself as soon as it is submitted with the suitable data", () => {
  const onClose = jest.fn();
  const openSnackBar = jest.fn();
  const dispatch = jest.fn();
  const heading = "This is heading";
  const content = "This is content";
  const type = "TODO";
  const state = {};
  state[type] = [];
  render(
    <Modal
      onClose={onClose}
      state={state}
      type={type}
      openSnackBar={openSnackBar}
      dispatch={dispatch}
    />
  );
  fireEvent.change(
    screen.getByRole("textbox", {
      name: /heading:/i,
    }),
    { target: { value: heading } }
  );
  fireEvent.change(
    screen.getByRole("textbox", {
      name: /content:/i,
    }),
    { target: { value: content } }
  );
  fireEvent.click(
    screen.getByRole("button", {
      name: /submit/i,
    })
  );
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(openSnackBar).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith({
    payload: [{ content, heading: heading, id: expect.any(String) }],
    type: `UPDATE_${type}`,
  });
});

test("Modal component should not run if not passed with heading", () => {
  const onClose = jest.fn();
  const openSnackBar = jest.fn();
  const dispatch = jest.fn();
  const content = "This is content";
  const type = "TODO";
  const state = {};
  state[type] = [];
  render(
    <Modal
      onClose={onClose}
      state={state}
      type={type}
      openSnackBar={openSnackBar}
      dispatch={dispatch}
    />
  );
  fireEvent.change(
    screen.getByRole("textbox", {
      name: /content:/i,
    }),
    { target: { value: content } }
  );
  fireEvent.click(
    screen.getByRole("button", {
      name: /submit/i,
    })
  );
  expect(onClose).not.toHaveBeenCalled();
  expect(openSnackBar).not.toHaveBeenCalled();
  expect(dispatch).not.toHaveBeenCalled();
});
