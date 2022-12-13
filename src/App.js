import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MyPreferences from "./components/MyPreferences/MyPreferences";
import NewPreference from "./components/NewPreference/NewPreference";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route index element={<MyPreferences title="My categories" />} />
          <Route
            path={"newcategory"}
            element={<NewPreference title="New category" />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
