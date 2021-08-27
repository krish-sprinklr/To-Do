import { render, screen, cleanup } from "@testing-library/react";
import Snackbar from "../Snackbar";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("Snackbar must display children and call close after 2000ms if delay not specified", async () => {
  jest.useFakeTimers();
  const open = true;
  const close = jest.fn();
  const children = "This is child";
  render(
    <Snackbar open={open} close={close}>
      {children}
    </Snackbar>
  );
  expect(screen.getByText(children)).toBeInTheDocument();
  jest.advanceTimersByTime(2000);
  expect(close).toHaveBeenCalledTimes(1);
});

test("Snackbar must display children and call close delay is specified", async () => {
  jest.useFakeTimers();
  const open = true;
  const close = jest.fn();
  const children = "This is child";
  const delay = 500;
  render(
    <Snackbar open={open} close={close} delay={delay}>
      {children}
    </Snackbar>
  );
  expect(screen.getByText(children)).toBeInTheDocument();
  jest.advanceTimersByTime(delay);
  expect(close).toHaveBeenCalledTimes(1);
});
// Fast forward timer
