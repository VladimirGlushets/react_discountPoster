import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./NewPreference.css";

const { getAllGroups } = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function NewPreference({ title, locale }) {
  console.log(locale);

  if(!title){
    title = locale.newPreference.title;
  }

  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [allGroups, setAllGroups] = useState([]);
  const [isAllGroupsLoading, setIsAllGroupsLoading] = useState(false);

  useEffect(() => {
    tg.ready();
    tg.BackButton.isVisible = true;
    tg.BackButton.show();
    tg.BackButton.onClick(backButtonClickedHandler);

    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {
      setIsAllGroupsLoading(true);
      let allCategories = await getAllGroups(user);
      setIsAllGroupsLoading(false);

      setAllGroups(allCategories);
    }

    fetchData();

    return () => {
      // отписываемся от события
      tg.BackButton.offClick(backButtonClickedHandler);
    };
  }, []);

  const backButtonClickedHandler = () => {
    navigate("/");
  };

  const onGroupClick = async (groupId) => {
    navigate("/newcategory/" + groupId);
  };

  const allGroupsDom =
    allGroups && allGroups.length
      ? allGroups.map((group, index) => {
          let title = "" + group.icon + group.displayName;

          return (
            <Button
              key={index}
              title={title}
              onClick={() => onGroupClick(group.groupId)}
            />
          );
        })
      : locale.newPreference.noSupportedCategories;

  return (
    <>
      <div className="new_category">
        <h1>{title}</h1>
        {isAllGroupsLoading ? (
          <h3 className="loading">{locale.newPreference.loading}</h3>
        ) : (
          allGroupsDom
        )}
      </div>
    </>
  );
}

export default NewPreference;
