import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import NewPreference from "../NewPreference/NewPreference";
import "./MainMenu.css";

const { getMyPreferencies } = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function MainMenu({ title, locale }) {
  
  const navigate = useNavigate();

  const [myCategories, setMyCategories] = useState([]);
  const [isMyPrefLoading, setIsMyPrefLoading] = useState(false);
  const [isMyPrefLoadingError, setIsMyPrefLoadingError] = useState(false);

  useEffect(() => {
    tg.ready();
    tg.BackButton.isVisible = false;
    tg.BackButton.hide();

    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }

    async function fetchData() {
      setIsMyPrefLoading(true);

      try {
        const filters = await getMyPreferencies(user);
        setMyCategories(filters);
        setIsMyPrefLoading(false);
      } catch (e) {
        setIsMyPrefLoading(false);
        setIsMyPrefLoadingError(true);
      }
    }

    fetchData();
  }, []);

  const myCategoriesOnClick = () => {
    navigate("/mycategories", { state: { myCategories: myCategories } });
  };

  const newCategoryOnClick = () => {
    navigate("/newcategory");
  };

  const mainMenuDom = (
    <>
      <div className="mainmenu-item">
        <Button title={locale.addCategory} onClick={newCategoryOnClick} />
      </div>

      <div className="mainmenu-item">
        <Button
          title={locale.myCategories + " (" + myCategories.length + ")"}
          onClick={myCategoriesOnClick}
        />
      </div>
    </>
  );

  const isLoadingDom = (
    <>
      <div className="mainmenu-item">
        <Button title={locale.addCategory} onClick={newCategoryOnClick} />
      </div>
      <h3 className="loading">{locale.loading}</h3>
    </>
  );

  const isMyPrefLoadingErrorDom = (
    <>
      <div className="mainmenu-item">
        <Button title={locale.addCategory} onClick={newCategoryOnClick} />
      </div>
      <h3 className="loading">{locale.dataLoadingError}</h3>
    </>
  );

  return (
    <div className="mainmenu">
      <h1>{title}</h1>
      {isMyPrefLoading ? (
        isLoadingDom
      ) : isMyPrefLoadingError ? (
        isMyPrefLoadingErrorDom
      ) : myCategories && myCategories.length ? (
        mainMenuDom
      ) : (
        <NewPreference title={locale.newCategory} />
      )}
    </div>
  );
}

export default MainMenu;
