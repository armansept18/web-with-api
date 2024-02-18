import { useState } from "react";
import "./App.css";
import { Navbar, NavbarMobile } from "./components/navbar";
import { HomePage } from "./pages/homepage";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <NavbarMobile />
      <HomePage search={search} />
    </>
  );
}

export default App;
