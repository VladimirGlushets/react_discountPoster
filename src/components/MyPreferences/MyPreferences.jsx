import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Preference from "../Preference/Preference";
import "./MyPreferences.css";

const { getMyPreferencies, deleteFilter } = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function MyPreferences({ title }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { myCategories } = state; // Read values passed on state

  let [userId, setUserId] = useState();
  let [myPreferencies, setMyPreferencies] = useState([]);

  useEffect(() => {
    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {
      console.log("fetch data");
      await refreshMyFilters(user);
    }

    if (myCategories && myCategories.length) {
      setMyPreferencies(myCategories);
    } else {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshMyFilters = async (userId) => {
    let jsonFilters = await getMyPreferencies(userId);
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
      await deleteFilter(userId, filter);
      await refreshMyFilters(userId);
    }
  };

  const onDetails = (filter) => {
    navigate("/details", { state: { preference: filter } });
  };

  const onEdit = (filter) => {
    navigate("/details", { state: { preference: filter } });
  };

  return (
    <div className="my_categories">
      <h1>{title}</h1>
      {myPreferencies.length ? (
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
