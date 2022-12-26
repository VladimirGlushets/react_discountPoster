import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preference from "../Preference/Preference";
import "./MyPreferences.css";

const { getMyPreferencies, deletePreference } = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function MyPreferences({ title }) {
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [myPreferencies, setMyPreferencies] = useState([]);
  const [isPrefLoading, setIsPrefLoading] = useState(false);

  useEffect(() => {
    tg.ready();
    tg.onEvent("backButtonClicked", backButtonClickedHandler);

    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {
      await refreshMyFilters(user);
    }

    fetchData();

    return () => {
      // отписываемся от события
      tg.offEvent("backButtonClicked", backButtonClickedHandler);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const backButtonClickedHandler = () => {
    navigate("/");
  };

  const refreshMyFilters = async (userId) => {
    setIsPrefLoading(true);
    let jsonFilters = await getMyPreferencies(userId);
    setIsPrefLoading(false);

    if (jsonFilters.length) {
      setMyPreferencies(jsonFilters);
    }
  };

  const onDelete = async (filter) => {
    if (tg.initDataUnsafe.user) {
      tg.showConfirm("Are you sure?", (isok) =>
        deleteFilterHandler(isok, filter)
      );
    } else {
      await deleteFilterHandler(true, filter);
    }
  };

  const deleteFilterHandler = async (ok, filter) => {
    if (ok) {
      setIsPrefLoading(true);
      await deletePreference(userId, filter);
      await refreshMyFilters(userId);
      setIsPrefLoading(false);
    }
  };

  const onDetails = (filter) => {
    navigate("/details/" + filter.categoryId + "/false");
  };

  const onEdit = (filter) => {
    navigate("/details/" + filter.categoryId + "/false");
  };

  return (
    <div className="my_categories">
      <h1>{title}</h1>
      {isPrefLoading ? (
        <h2>Loading...</h2>
      ) : myPreferencies.length ? (
        myPreferencies.map((pref, index) => {
          return (
            <Preference
              key={index}
              preference={pref}
              onDetails={onDetails}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default MyPreferences;
