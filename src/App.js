import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MyPreferences from "./components/MyPreferences/MyPreferences";
import NewPreference from "./components/NewPreference/NewPreference";
import PreferenceDetails from './components/PreferenceDetails/PreferenceDetails';


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
          <Route
            path={"details"}
            element={<PreferenceDetails title="Preference details" />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
