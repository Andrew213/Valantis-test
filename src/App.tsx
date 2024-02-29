import "./App.css";
import Filters from "./components/Filters/FormFilters";
import ItemsTable from "./components/ItemsTable/ItemsTable";

function App() {
  return (
    <div className="App">
      <Filters />
      <ItemsTable />
    </div>
  );
}

export default App;
