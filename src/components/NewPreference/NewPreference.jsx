import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./NewPreference.css";

const {
  getAllGroups,
  getAllCategoriesForGroup,
  upsertPreference,
} = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function NewPreference({ title }) {
  const navigate = useNavigate();

  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {
      let allCategories = await getAllGroups();
      setAllGroups(allCategories);
    }

    fetchData();
  }, []);

  const onGroupClick = async (groupId) => {
    setSelectedGroupId(groupId);

    let categories = await getAllCategoriesForGroup(groupId);
    setCategories(categories);
  };

  const onCategoryClick = async (categoryId) => {
    await upsertPreference(userId, { categoryId: categoryId });
    navigate("/details/" + categoryId);
  };

  const allGroupsDom = allGroups && allGroups.length
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

  const categoriesDom = categories.length ? (
    categories.map((category, index) => {
      let title = "" + category.icon + category.displayName;

      return (
        <Button
          key={index}
          title={title}
          onClick={() => onCategoryClick(category.categoryId)}
        />
      );
    })
  ) : (
    <></>
  );

  return (
    <>
      <div className="new_category">
        <h1>{title}</h1>
        {selectedGroupId ? categoriesDom : allGroupsDom}
      </div>
    </>
  );
}

export default NewPreference;
