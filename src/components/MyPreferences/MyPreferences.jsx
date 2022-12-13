import React, { useEffect, useState } from "react";
import Preference from "../Preference/Preference";
import "./MyPreferences.css";

const { getMyPreferencies , deleteFilter} = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function MyPreferences({ title }) {
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
      await refreshMyFilters(user);
    }

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshMyFilters = async (userId) => {
    let jsonFilters = await getMyPreferencies(userId);
    if (jsonFilters.length) {
      setMyPreferencies(jsonFilters);
    }
  };

  const onDelete = async (filter) => {
    if (tg.initDataUnsafe.user) {
      tg.showConfirm("Are you sure?", (isok) => deleteFilterHandler(isok, filter));
    } else {
      await deleteFilterHandler(true, filter);
    }
  };

  const deleteFilterHandler = async (ok, filter) => {    
    if(ok){
      await deleteFilter(userId, filter);
      await refreshMyFilters(userId);
    }   
  };  

  return (
    <div className="my_categories">
      {myPreferencies.length ? (
        myPreferencies.map((pref, index) => {
          return (
            <Preference
              key={index}
              preference={pref}
              onDelete ={onDelete}           
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
