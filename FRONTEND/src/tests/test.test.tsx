import { MemoryRouter } from "react-router";
import App from "../App";
import { render, screen } from "@testing-library/react";

// test to make sure the testing suite works
describe("tests", () => {
  it("should render component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(<App />).toMatchSnapshot();
    screen.debug();
  });
});
