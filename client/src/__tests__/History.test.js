// import { render, screen } from "@testing-library/react";
// import App from "../App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from "react";
import { shallow } from "enzyme";
import History from "../pages/user/History";

describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    shallow(<History />);
  });
});
