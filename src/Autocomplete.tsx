import { useEffect, useRef, useState } from "react";
import { Dropdown } from "./Dropdown";
import "./autocomplete.css";
import { useFetch } from "./useFetch";
import { debounce } from "./utils";

type AutocompleteProps<T> = {
  onItemSelected: (v: T) => unknown;
  renderItem: (item: T) => string;
  source: string;
};

export function Autocomplete<T>(props: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const { request, isLoading, data: items } = useFetch<Array<T>>(props.source);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
    const { value } = e.target;
    if (value && value.length > 1) {
      request({ search: value }).catch(console.error);
    }
  };

  const onItemSelected = (item: T) => {
    if (inputRef.current) {
      inputRef.current.value = props.renderItem(item);
    }
    props.onItemSelected(item);
    setOpen(false);
  };

  useEffect(() => {
    const onClickOutside = () => {
      if (open) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div className="container">
      <input
        aria-label="autocomplete input"
        type="text"
        onChange={debounce(onChange, 500)}
        ref={inputRef}
        className="autocomplete-input"
      />
      {open ? (
        <Dropdown
          onSelect={onItemSelected}
          renderItem={props.renderItem}
          items={items || []}
          isLoading={isLoading}
        />
      ) : null}
    </div>
  );
}
