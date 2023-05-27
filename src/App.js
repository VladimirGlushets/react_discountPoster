import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainMenu from "./components/MainMenu/MainMenu";
import MyPreferences from "./components/MyPreferences/MyPreferences";
import NewPreference from "./components/NewPreference/NewPreference";
import NewPreferenceGroup from "./components/NewPreferenceGroup/NewPreferenceGroup";
import PreferenceDetails from "./components/PreferenceDetails/PreferenceDetails";

const { getWebUiLocalization } = require("./data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function App() {
  const [userId, setUserId] = useState();
  const [locale, setLocale] = useState({});
  const [mainMenuTitle, setMainMenuTitle] = useState("");

  useEffect(() => {
    tg.ready();
    
    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {
      let inputLocale = await getWebUiLocalization(user);      

      setLocale(inputLocale);
      setMainMenuTitle(inputLocale.mainMenu.title);
    }

    fetchData();    
  }, []);

  let mainElement = (
    <header className="App-header">
        <Routes>
          <Route index element={<MainMenu title={mainMenuTitle} locale={locale.mainMenu} />} />
          <Route
            path={"newcategory"}
            element={<NewPreference title="Выберите группу категорий" />}
          />
          <Route
            path={"newcategory/:groupId"}
            element={<NewPreferenceGroup title="Выберите категорию для группы" />}
          />
          <Route
            path={"newcategory/:groupId/:categoryId"}
            element={<PreferenceDetails title="Preference details" isNew={true}/>}
          />
          <Route
            path={"details/:categoryId"}
            element={<PreferenceDetails title="Preference details" isNew={false}/>}
          />
          <Route
            path={"mycategories"}
            element={<MyPreferences title="Мои категории" />}
          />
        </Routes>
      </header>
  );

  return (
    <div className="App">
        {!locale.mainMenu ? (
          <h3 className="loading">Loading...</h3>
        ) : (          
          mainElement
        )}      
    </div>
  );
}

export default App;
