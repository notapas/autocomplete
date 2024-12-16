import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dropdown } from "../Dropdown";

describe("Dropdown", () => {
  it("Should render loading message with isLoading prop = true", async () => {
    render(
      <Dropdown
        renderItem={() => `~`}
        items={[]}
        onSelect={() => {}}
        isLoading={true}
      />
    );
    const element = screen.queryByText("Loading...");
    expect(element).toBeInTheDocument();
  });
  it("Should not render loading message with isLoading prop = false", async () => {
    render(<Dropdown renderItem={() => `~`} items={[]} onSelect={() => {}} />);
    const element = screen.queryByText("Loading...");
    expect(element).not.toBeInTheDocument();
  });
  it("Should render items correctly based on renderItem function", async () => {
    const firstName = Math.random().toString(20).substr(2, 6);
    const lastName = Math.random().toString(20).substr(2, 6);
    render(
      <Dropdown
        renderItem={(item) => `${item.firstName} - ${item.lastName}`}
        items={[{ id: Date.now(), firstName, lastName }]}
        onSelect={() => {}}
      />
    );
    const element = screen.queryByText(`${firstName} - ${lastName}`);
    expect(element).toBeInTheDocument();
  });

  it("Should call onSelect function when an element is clicked", () => {
    const onSelect = jest.fn();
    const firstName = Math.random().toString(20).substr(2, 6);
    const lastName = Math.random().toString(20).substr(2, 6);
    const item = { id: Date.now(), firstName, lastName };
    render(
      <Dropdown
        renderItem={(item) => `${item.firstName} - ${item.lastName}`}
        items={[item]}
        onSelect={onSelect}
      />
    );
    const element = screen.queryByText(`${firstName} - ${lastName}`);
    expect(element).toBeInTheDocument();
    if (element) {
      fireEvent.click(element);
      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({ ...item })
      );
    }
  });
});
