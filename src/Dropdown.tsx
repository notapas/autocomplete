type DropdownProps<T> = {
  renderItem: (item: T) => string;
  onSelect: (v: T) => unknown;
  items: T[];
  isLoading?: boolean;
};

export function Dropdown<T>(props: DropdownProps<T>) {
  if (props.isLoading) {
    return <div className="dropdown">Loading...</div>;
  } else if (props.items.length) {
    return (
      <div className="dropdown">
        <ul>
          {props.items.map((item, k) => (
            <li
              key={k}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => {
                props.onSelect(item);
              }}
            >
              {props.renderItem(item)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}
