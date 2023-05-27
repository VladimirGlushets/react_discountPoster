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
  const [locale, setLocale] = useState({});

  useEffect(() => {
    tg.ready();
    
    let userId = null;
    if (tg.initDataUnsafe.user) {
      userId = tg.initDataUnsafe.user.id;
    } else {
      userId = defaultUserId;
    }

    async function fetchData() {
      let inputLocale = await getWebUiLocalization(userId);      

      console.log(inputLocale);

      setLocale(inputLocale);
    }

    fetchData();    
  }, []);

  let mainElement = (
    <header className="App-header">
        <Routes>
          <Route index element={<MainMenu locale={locale} />} />
          <Route
            path={"newcategory"}
            element={<NewPreference locale={locale}/>}
          />
          <Route
            path={"newcategory/:groupId"}
            element={<NewPreferenceGroup locale={locale} />}
          />
          <Route
            path={"newcategory/:groupId/:categoryId"}
            element={<PreferenceDetails locale={locale} isNew={true}/>}
          />
          <Route
            path={"details/:categoryId"}
            element={<PreferenceDetails locale={locale} isNew={false}/>}
          />
          <Route
            path={"mycategories"}
            element={<MyPreferences locale={locale} />}
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
