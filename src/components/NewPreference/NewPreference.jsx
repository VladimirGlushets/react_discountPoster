import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./NewPreference.css";

const { getAllGroups } = require("../../data/data");

const tg = window.Telegram.WebApp;

function NewPreference({ title }) {
  const navigate = useNavigate();

  const [allGroups, setAllGroups] = useState([]);
  const [isAllGroupsLoading, setIsAllGroupsLoading] = useState(false);

  useEffect(() => {
    tg.ready();
    tg.BackButton.isVisible = true;
    tg.BackButton.show();
    tg.BackButton.onClick(backButtonClickedHandler);
    // tg.onEvent("backButtonClicked", backButtonClickedHandler);

    async function fetchData() {
      setIsAllGroupsLoading(true);
      let allCategories = await getAllGroups();
      setIsAllGroupsLoading(false);

      setAllGroups(allCategories);
    }

    fetchData();

    return () => {
      // отписываемся от события
      // tg.offEvent("backButtonClicked", backButtonClickedHandler);
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
      : "No supported categories.";

  return (
    <>
      <div className="new_category">
        <h1>{title}</h1>
        <Button title={"Back"} onClick={backButtonClickedHandler} />
        {isAllGroupsLoading ? <h3>Loading...</h3> : allGroupsDom}
      </div>
    </>
  );
}

export default NewPreference;
