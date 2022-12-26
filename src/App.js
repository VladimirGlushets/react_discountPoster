import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainMenu from "./components/MainMenu/MainMenu";
import MyPreferences from "./components/MyPreferences/MyPreferences";
import NewPreference from "./components/NewPreference/NewPreference";
import NewPreferenceGroup from "./components/NewPreferenceGroup/NewPreferenceGroup";
import PreferenceDetails from "./components/PreferenceDetails/PreferenceDetails";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<MainMenu title="Главное меню" />} />
          <Route
            path={"newcategory"}
            element={<NewPreference title="Выберите группу категорий" />}
          />
          <Route
            path={"newcategory/:groupId"}
            element={<NewPreferenceGroup title="Выберите категорию для группы" />}
          />
          <Route
            path={"details/:id/:isNew"}
            element={<PreferenceDetails title="Preference details" />}
          />
          <Route
            path={"mycategories"}
            element={<MyPreferences title="Мои категории" />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
