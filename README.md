# Autocomplete

> Simple autocomplete component

## Setup

Install dependencies

```
npm install
```

## Usage and Configuration

Set env `VITE_API_URL` variable in the `.env` file if you want to test directly the example from `App.tsx`.
In this case make a copy `.env.example` and rename it to `.env`. Adjust `VITE_API_URL` variable, e.g.:

```
VITE_API_URL=https://etherqmshqkpehcowxqh.supabase.co/functions/v1/cities
```

Otherwise follw the next steps.

Import autocomplete component from 'src' dir

```
import { Autocomplete } from "./Autocomplete";
```

Then you have to pass some props:

- `source` => the API url to fetch data from (you can set an env variable to avoid hardcoding it)
- `onItemSelected` => callback function executed on item selection. This is needed the get back selected item
- `renderItem` => a callback used to render items in the dropdown, since you could use this component with different data types and need to render items in some different ways. For example, using `City` as input you would show `` renderItem={(item: City) => `${item.country} => ${item.name}`} `` to print both country and city. This is its type: `renderItem: (item: T) => string;`

```js
<Autocomplete
  source={import.meta.env.VITE_API_URL}
  onItemSelected={onCitySelected}
  renderItem={(item: City) => item.name}
/>
```

`Dropdown` component is exported too from `/src/Dropdown.tsx` because it is independent. It displays only a list of provided items. If you need you can use it this way:

```js
<Dropdown
  onSelect={onItemSelected}
  renderItem={props.renderItem}
  items={items || []}
  isLoading={isLoading}
/>
```

where

- `onSelect` => callback used when an element of the list is clicked
- `renderItem` => callback used to show the item (as before `renderItem: (item: T) => string;`)
- `items` => generic array of items of type `T`
- `isLoading` => whether or not you have to show "Loading..." (optional)

## Test

```
npm run test
```
