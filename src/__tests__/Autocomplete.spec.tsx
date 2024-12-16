import { Autocomplete } from "../Autocomplete";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockedDropdownText = "Mocked Dropdown component";
const item = { id: Date.now(), firstName: "Foo", lastName: "Bar" };

jest.mock("../Dropdown", () => ({
  Dropdown: () => <div>{mockedDropdownText}</div>,
}));
jest.mock("../useFetch", () => ({
  useFetch: () => ({
    request: () => Promise.resolve(),
    isLoading: false,
    data: [item],
  }),
}));

describe("Autocomplete", () => {
  let input: HTMLElement;
  beforeEach(() => {
    render(
      <Autocomplete
        onItemSelected={() => {}}
        renderItem={() => "test"}
        source="test"
      />
    );
    input = screen.getByLabelText("autocomplete input");
  });

  it("Should not render Dropdown component if open state = false", async () => {
    const element = screen.queryByText(mockedDropdownText);
    expect(element).not.toBeInTheDocument();
  });

  it("Should render Dropdown component if open state = true", async () => {
    fireEvent.change(input, { target: { value: "ab" } });
    expect(await screen.findByText(mockedDropdownText)).toBeInTheDocument();
  });

  it("", async () => {
    jest.unmock("../Dropdown");
    await import("../Dropdown");
    cleanup();
    render(
      <Autocomplete
        onItemSelected={() => {}}
        renderItem={() => "test"}
        source="test"
      />
    );

    //jest.unmock("../Dropdown");
    //await import("../Dropdown");
    fireEvent.change(input, { target: { value: "te" } });

    const element = await screen.findByText("test");
    fireEvent.click(element);
    expect(input).toHaveValue("test");
  });
});
