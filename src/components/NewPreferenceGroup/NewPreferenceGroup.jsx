import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import "./NewPreferenceGroup.css";

const {
  getAllCategoriesForGroup,
  upsertPreference,
  getPreference,
} = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function NewPreferenceGroup({ title }) {
  const navigate = useNavigate();
  let { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState();
  const [isAllCategoriesLoading, setIsAllCategoriesLoading] = useState(false);
  const [isCategorySaving, setIsCategorySaving] = useState(false);

  useEffect(() => {
    tg.ready();
    tg.BackButton.isVisible = true;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", backButtonClickedHandler);

    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {
      setIsAllCategoriesLoading(true);
      let categoriesResponse = await getAllCategoriesForGroup(groupId);
      setIsAllCategoriesLoading(false);

      setGroup(categoriesResponse.group);
      setCategories(categoriesResponse.categories);
    }

    fetchData();

    return () => {
      // отписываемся от события
      tg.offEvent("backButtonClicked", backButtonClickedHandler);
    };
  }, [groupId]);

  const backButtonClickedHandler = () => {
    navigate("/newcategory");
  };

  const onCategoryClick = async (categoryId) => {
    setIsCategorySaving(true);
    let existingPrefResponse = await getPreference(userId, categoryId);    
    if (existingPrefResponse.myPreference == null) {
      await upsertPreference(userId, { categoryId: categoryId });
    }
    setIsCategorySaving(false);

    navigate("/newcategory/" + groupId + "/" + categoryId);
  };

  const onTitleClick = () => {
    navigate("/newcategory");
  };

  const categoriesDom = categories.length ? (
    <>
      {categories.map((category, index) => {
        let title = "" + category.icon + category.displayName;

        return (
          <Button
            key={index}
            title={title}
            onClick={() => onCategoryClick(category.categoryId)}
          />
        );
      })}
    </>
  ) : (
    <></>
  );

  return (
    <>
      <div className="new_category">
        <h2 className="new_category_title" onClick={onTitleClick}>
          {group.displayName}
        </h2>
        {isAllCategoriesLoading ? (
          <h3 className="loading">Loading...</h3>
        ) : isCategorySaving ? (
          <h3 className="loading">Saving...</h3>
        ) : (
          categoriesDom
        )}
      </div>
    </>
  );
}

export default NewPreferenceGroup;
