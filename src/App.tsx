import { Autocomplete } from "./Autocomplete";

type City = {
  id: string;
  name: string;
  country: string;
};

function App() {
  const onCitySelected = (city: City) => {
    console.log("Selected", city.id);
  };

  return (
    <>
      <Autocomplete
        source={import.meta.env.VITE_API_URL}
        onItemSelected={onCitySelected}
        renderItem={(item: City) => item.name}
      />
    </>
  );
}

export default App;
