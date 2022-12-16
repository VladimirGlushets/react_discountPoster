import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import DetailsItem from "../DetailsItem/DetailsItem";
import "./PreferenceDetails.css";

const { upsertPreference, getPreference } = require("../../data/data");

const tg = window.Telegram.WebApp;

function PreferenceDetails({ title }) {
  const navigate = useNavigate();
  let { id } = useParams();

  const [initPreference, setInitPreference] = useState({});
  const [preferenceDetails, setPreferenceDetails] = useState({});

  const [saveVisible, setSaveVisible] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [userId, setUserId] = useState();

  const defaultUserId = 558969327;

  useEffect(() => {
    let user = null;
    if (tg.initDataUnsafe.user) {
      user = tg.initDataUnsafe.user.id;
    } else {
      user = defaultUserId;
    }
    setUserId(user);

    async function fetchData() {      
      let initPref = await getPreference(user, id);
      setInitPreference(initPref);
      setPreferenceDetails({...initPref});
    }

    fetchData();    
  }, []);

  const onPrefChange = (pref) => {
    if (JSON.stringify(initPreference) !== JSON.stringify(pref)) {
      setSaveVisible(true);
      setPreferenceDetails(pref);
    } else {
      setSaveVisible(false);
    }
  };

  const minDiscountOnChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      setValidationError("Минимальная скидка должна быть числом");
      setSaveDisabled(true);
      return;
    }

    if (value > 100) {
      setValidationError("Минимальная скидка больше 100%");
      setSaveDisabled(true);
      return;
    }
    if (validationError) {
      setValidationError("");
      setSaveDisabled(false);
    }
    let pref = { ...preferenceDetails };
    pref.minDiscount = value;

    onPrefChange(pref);
  };

  const minRatingOnChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setValidationError("Минимальный рейтинг должен быть числом");
      setSaveDisabled(true);
      return;
    }

    if (value > 5) {
      setValidationError("Минимальный рейтинг от 0 до 5");
      setSaveDisabled(true);
      return;
    }
    if (validationError) {
      setValidationError("");
      setSaveDisabled(false);
    }

    let pref = { ...preferenceDetails };
    pref.minRating = value;

    onPrefChange(pref);
  };

  const priceFromOnChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setValidationError("Цена от должна быть числом");
      setSaveDisabled(true);
      return;
    }

    if (validationError) {
      setValidationError("");
      setSaveDisabled(false);
    }

    let pref = { ...preferenceDetails };
    pref.priceFrom = value;

    onPrefChange(pref);
  };

  const priceToOnChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setValidationError("Цена до должна быть числом");
      setSaveDisabled(true);
      return;
    }
    if (validationError) {
      setValidationError("");
      setSaveDisabled(false);
    }

    let pref = { ...preferenceDetails };
    pref.priceTo = value;

    onPrefChange(pref);
  };

  const showPopup = (title, message) => {
    if (tg.initDataUnsafe.user) {
      tg.showPopup({ title: title, message: message }, navigate("/"));
    }
  };

  const onSave = async () => {
    await upsertPreference(userId, preferenceDetails);

    showPopup("Изменения сохранены", "Saved");
    setSaveVisible(false);
  };

  return (
    <>
      <div className="preference-details">
        {!preferenceDetails ? (
          "NoPreference"
        ) : (
          <>
            <h1>{preferenceDetails.categoryName}</h1>
            <section>
              <DetailsItem
                label={"Минимальная скидка, %"}
                value={preferenceDetails.minDiscount}
                onChange={minDiscountOnChange}
              />
              <DetailsItem
                label={"Минимальный рейтинг, 0-5"}
                value={preferenceDetails.minRating}
                onChange={minRatingOnChange}
              />
              <DetailsItem
                label={"Цена от $"}
                value={preferenceDetails.priceFrom}
                onChange={priceFromOnChange}
              />
              <DetailsItem
                label={"Цена до $"}
                value={preferenceDetails.priceTo}
                onChange={priceToOnChange}
              />
              {validationError ? (
                <div className="validation-error">{validationError}</div>
              ) : (
                <></>
              )}
              {saveVisible ? (
                <Button
                  title={"Save changes"}
                  onClick={onSave}
                  isDisabled={saveDisabled}
                />
              ) : (
                <></>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default PreferenceDetails;
