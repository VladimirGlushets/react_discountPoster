import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainMenu from "./components/MainMenu/MainMenu";
import MyPreferences from "./components/MyPreferences/MyPreferences";
import NewPreference from "./components/NewPreference/NewPreference";
import PreferenceDetails from "./components/PreferenceDetails/PreferenceDetails";

function App() {
  console.log(process.env);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<MainMenu title={process.env.REACT_APP_MAIN} />} />
          <Route
            path={"newcategory"}
            element={<NewPreference title="Выберите группу категорий" />}
          />
          <Route
            path={"details/:id"}
            element={<PreferenceDetails title="Preference details" />}
          />
          <Route
            path={"mycategories"}
            element={<MyPreferences title="My categories" />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
