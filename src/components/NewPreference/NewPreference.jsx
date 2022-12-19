import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./NewPreference.css";

const {
  getAllGroups,
  getAllCategoriesForGroup,
  upsertPreference,
  getPreference,
} = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function NewPreference({ title }) {
  const navigate = useNavigate();

  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState();
  const [isAllGroupsLoading, setIsAllGroupsLoading] = useState(false);
  const [isAllCategoriesLoading, setIsAllCategoriesLoading] = useState(false);

  useEffect(() => {
    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {
      setIsAllGroupsLoading(true);
      let allCategories = await getAllGroups();
      setIsAllGroupsLoading(false);

      setAllGroups(allCategories);
    }

    fetchData();
  }, []);

  const onGroupClick = async (groupId) => {
    setSelectedGroupId(groupId);

    setIsAllCategoriesLoading(true);
    let categories = await getAllCategoriesForGroup(groupId);
    setIsAllCategoriesLoading(false);

    setCategories(categories);
  };

  const onCategoryClick = async (categoryId) => {
    let existingPref = await getPreference(userId, categoryId);
    if (existingPref == null) {
      await upsertPreference(userId, { categoryId: categoryId });
    }

    navigate("/details/" + categoryId);
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

  const categoriesDom = isAllCategoriesLoading ? (
    <h3>Loading...</h3>
  ) : categories.length ? (
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
        {isAllGroupsLoading ? (
          <h3>Loading...</h3>
        ) : selectedGroupId ? (
          categoriesDom
        ) : (
          allGroupsDom
        )}
      </div>
    </>
  );
}

export default NewPreference;
