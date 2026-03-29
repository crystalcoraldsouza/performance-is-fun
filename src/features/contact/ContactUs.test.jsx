import { render, screen, fireEvent } from "@testing-library/react";
import ContactUs from "./ContactUs";

describe("ContactUs", () => {
  it("renders contact form", () => {
    render(<ContactUs />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const button = screen.getByRole("button", { name: /send/i });
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
    expect(button).toBeDisabled();
  });
  it("enables button when all fields are filled", () => {
    render(<ContactUs />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const button = screen.getByRole("button", { name: /send/i });

    fireEvent.input(nameInput, { target: { value: "John" } });
    fireEvent.input(emailInput, { target: { value: "John@abc.com" } });
    fireEvent.input(messageInput, { target: { value: "Hello!" } });
    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("John@abc.com");
    expect(messageInput.value).toBe("Hello!");
    expect(button).not.toBeDisabled();
  });
  it("fires alert on submit", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<ContactUs />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const button = screen.getByRole("button", { name: /send/i });

    fireEvent.input(nameInput, { target: { value: "John" } });
    fireEvent.input(emailInput, { target: { value: "John@abc.com" } });
    fireEvent.input(messageInput, { target: { value: "Hello!" } });
    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("John@abc.com");
    expect(messageInput.value).toBe("Hello!");
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalled();
  });
});
