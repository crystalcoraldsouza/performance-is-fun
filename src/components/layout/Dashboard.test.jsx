import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("renders Dashboard", () => {
    render(<Dashboard />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
