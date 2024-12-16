import { Autocomplete } from "../Autocomplete";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockedDropdownText = "Mocked Dropdown component";
const item = { id: Date.now(), firstName: "Foo", lastName: "Bar" };

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
    fireEvent.change(input, { target: { value: "te" } });
    expect(await screen.findByText("test")).toBeInTheDocument();
  });

  it("Input should be filled with the clicked element text", async () => {
    cleanup();
    render(
      <Autocomplete
        onItemSelected={() => {}}
        renderItem={() => "test"}
        source="test"
      />
    );

    const search = screen.getByLabelText("autocomplete input");
    fireEvent.change(search, { target: { value: "te" } });

    const element = await screen.findByText("test");
    fireEvent.click(element);
    expect(search).toHaveValue("test");
  });

  it("Should close dropdown clicking outside", async () => {
    cleanup();
    render(
      <Autocomplete
        onItemSelected={() => {}}
        renderItem={() => "test"}
        source="test"
      />
    );

    const search = screen.getByLabelText("autocomplete input");
    fireEvent.change(search, { target: { value: "te" } });
    const dropdown = await screen.findByText("test");
    expect(dropdown).toBeInTheDocument();
    const element = document.body;
    fireEvent.mouseDown(element, {});

    expect(dropdown).not.toBeInTheDocument();
  });
});
