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
  const [prefLoading, setPrefLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      setPrefLoading(true);
      let initPref = await getPreference(user, id);
      setPrefLoading(false);

      setInitPreference(initPref);
      setPreferenceDetails({ ...initPref });
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
    let value;
    if (e.target.value) {
      value = parseInt(e.target.value);
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
    } else {
      value = null;
    }  

    let pref = { ...preferenceDetails };
    pref.minDiscount = value;

    onPrefChange(pref);
  };

  const minRatingOnChange = (e) => {
    let value;
    if (e.target.value) {
      value = parseFloat(e.target.value);
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
    } else {
      value = null;
    }

    let pref = { ...preferenceDetails };
    pref.minRating = value;

    onPrefChange(pref);
  };

  const priceFromOnChange = (e) => {
    let value;
    if (e.target.value) {
      value = parseFloat(e.target.value);
      if (isNaN(value)) {
        setValidationError("Цена От должна быть числом");
        setSaveDisabled(true);
        return;
      }

      if (
        preferenceDetails.priceTo != null &&
        value >= preferenceDetails.priceTo
      ) {
        setValidationError("Цена От должна быть меньше цены До");
        setSaveDisabled(true);
        return;
      }

      if (validationError) {
        setValidationError("");
        setSaveDisabled(false);
      }
    } else {
      value = null;
    }

    let pref = { ...preferenceDetails };
    pref.priceFrom = value;

    onPrefChange(pref);
  };

  const priceToOnChange = (e) => {
    // if empty string
    let value;
    if (e.target.value) {
      value = parseFloat(e.target.value);
      if (isNaN(value)) {
        setValidationError("Цена до должна быть числом");
        setSaveDisabled(true);
        return;
      }

      if (value <= preferenceDetails.priceFrom) {
        setValidationError("Цена От должна быть меньше цены До");
        setSaveDisabled(true);
        return;
      }

      if (validationError) {
        setValidationError("");
        setSaveDisabled(false);
      }
    } else {
      value = null;
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
    setIsSaving(true);
    await upsertPreference(userId, preferenceDetails);
    setIsSaving(false);

    showPopup("Изменения сохранены", "Saved");
    setSaveVisible(false);
  };

  const loadingDom = <h3>Loading...</h3>;
  const savingDom = <h3>Saving...</h3>;
  const saveButtonDom = saveVisible ? (
    isSaving ? (
      savingDom
    ) : (
      <Button
        title={"Save changes"}
        onClick={onSave}
        isDisabled={saveDisabled}
      />
    )
  ) : (
    <></>
  );

  const prefDetailsDom = (
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
          label={"Цена От $"}
          value={preferenceDetails.priceFrom}
          onChange={priceFromOnChange}
        />
        <DetailsItem
          label={"Цена До $"}
          value={preferenceDetails.priceTo}
          onChange={priceToOnChange}
        />
        {validationError ? (
          <div className="validation-error">{validationError}</div>
        ) : (
          <></>
        )}
        {saveButtonDom}
      </section>
    </>
  );

  return (
    <>
      <div className="preference-details">
        {prefLoading
          ? loadingDom
          : !preferenceDetails
          ? "NoPreference"
          : prefDetailsDom}
      </div>
    </>
  );
}

export default PreferenceDetails;
