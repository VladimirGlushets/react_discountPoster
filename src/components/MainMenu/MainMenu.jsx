import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import NewPreference from "../NewPreference/NewPreference";
import "./MainMenu.css";

const { getMyPreferencies } = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function MainMenu({ title }) {
  const navigate = useNavigate();

  const [myCategories, setMyCategories] = useState([]);

  useEffect(() => {
    tg.ready();
    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }

    async function fetchData() {
      const filters = await getMyPreferencies(user);
      setMyCategories(filters);
    }

    fetchData();
  }, []);

  const myCategoriesOnClick = () => {
    navigate("/mycategories", { state: { myCategories: myCategories } });
  };

  const newCategoryOnClick = () => {
    navigate("/newcategory");
  };

  let myCategoriesTitle = myCategories.length
    ? "Мои категории (" + myCategories.length + ")"
    : "Мои категории";

  const mainMenuDom = (
    <>
      <div className="mainmenu-item">
        <Button title={myCategoriesTitle} onClick={myCategoriesOnClick} />
      </div>

      <div className="mainmenu-item">
        <Button title={"Добавить категорию"} onClick={newCategoryOnClick} />
      </div>
    </>
  );

  return (
    <div className="mainmenu">
      <h1>{title}</h1>
      {myCategories.length ? (
        mainMenuDom
      ) : (
        <NewPreference title="New category" />
      )}
    </div>
  );
}

export default MainMenu;
