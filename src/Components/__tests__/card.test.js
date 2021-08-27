import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Card from "../Card";
import "@testing-library/jest-dom";
import { v4 as uuidv4 } from "uuid";

afterEach(() => {
  cleanup();
});

test("Card component should render the provided data", () => {
  const heading = "This is heading";
  const content = "This is content";
  const id = uuidv4();
  const cardData = { heading, content, id };
  render(<Card cardData={cardData} />);
  expect(
    screen.getByRole("heading", {
      name: /card-heading/i,
    })
  ).toHaveTextContent(heading);

  expect(screen.getByTestId(`card-content-${id}`)).toHaveTextContent(content);
});

test("Card component should render without content", () => {
  const heading = "This is heading";
  const id = uuidv4();
  const cardData = { heading, id };
  render(<Card cardData={cardData} />);
  expect(
    screen.getByRole("heading", {
      name: /card-heading/i,
    })
  ).toHaveTextContent(heading);
});

test("Card delete click", () => {
  const heading = "This is heading";
  const content = "This is content";
  const id = uuidv4();
  const cardData = { heading, content, id };
  render(<Card cardData={cardData} />);
  fireEvent.click(screen.getByAltText(/delete/i));
  expect(
    screen.getByText(/are you sure you want to delete\?/i)
  ).toBeInTheDocument();
});

test("Card delete click declined", () => {
  const heading = "This is heading";
  const content = "This is content";
  const id = uuidv4();
  const cardData = { heading, content, id };
  render(<Card cardData={cardData} />);
  fireEvent.click(screen.getByAltText(/delete/i));
  expect(
    screen.getByText(/are you sure you want to delete\?/i)
  ).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", {
      name: /no/i,
    })
  );
  expect(screen.queryByText(/are you sure you want to delete\?/i)).toBeNull();
});
