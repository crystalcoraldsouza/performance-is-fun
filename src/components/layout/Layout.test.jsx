import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  it("renders layout", () => {
    render(<Layout />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
