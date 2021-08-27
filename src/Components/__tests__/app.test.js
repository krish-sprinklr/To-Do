import {
  render,
  screen,
  cleanup,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../../App";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("App component must have loader at start and all 3 panels", async () => {
  render(<App />);
  expect(
    screen.getByRole("heading", {
      name: /loading\.\.\./i,
    })
  ).toHaveTextContent("Loading...");

  await waitForElementToBeRemoved(() =>
    screen.getByRole("heading", {
      name: /loading\.\.\./i,
    })
  );
  const list = screen.getByRole("list", {
    name: /to-do/i,
  });
  const { getAllByRole } = within(list);
  const items = getAllByRole("listitem");
  expect(items.length).toBe(3);
});
