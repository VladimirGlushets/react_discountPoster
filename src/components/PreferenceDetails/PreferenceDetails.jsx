import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import DetailsItem from "../DetailsItem/DetailsItem";
import "./PreferenceDetails.css";

const { upsertPreference, getPreference } = require("../../data/data");

const tg = window.Telegram.WebApp;
const defaultUserId = 558969327;

function PreferenceDetails({ locale, isNew }) {
  const navigate = useNavigate();
  let { categoryId } = useParams();

  const [initPreference, setInitPreference] = useState({});
  const [preferenceDetails, setPreferenceDetails] = useState({});
  const [selectedGroupId, setSelectedGroupId] = useState();

  const [saveVisible, setSaveVisible] = useState(false);
  const [skipVisible, setSkipVisible] = useState(isNew);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [userId, setUserId] = useState();
  const [prefLoading, setPrefLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      setPrefLoading(true);
      let prefResponse = await getPreference(user, categoryId);
      setPrefLoading(false);

      setInitPreference(prefResponse.myPreference);
      setPreferenceDetails({ ...prefResponse.myPreference });
      setSelectedGroupId(prefResponse.groupId);
    }

    fetchData();

    return () => {
      // отписываемся от события
      tg.BackButton.offClick(backButtonClickedHandler);
    };
  }, [selectedGroupId]);

  const backButtonClickedHandler = () => {
    console.log(isNew);

    if (isNew === true) {
      console.log("New");
      const groupId = selectedGroupId;
      console.log(groupId);
      navigate("/newcategory/" + groupId);
    } else {
      console.log("Not new");
      navigate("/mycategories");
    }
  };

  const onPrefChange = (pref) => {
    if (JSON.stringify(initPreference) !== JSON.stringify(pref)) {
      setSaveVisible(true);
      setSkipVisible(false);
      setPreferenceDetails(pref);
    } else {
      setSaveVisible(false);
      if (isNew) {
        setSkipVisible(true);
      }
    }
  };

  const minDiscountOnChange = (e) => {
    let value;
    if (e.target.value) {
      value = parseInt(e.target.value);
      if (isNaN(value)) {
        setValidationError(locale.preferenceDetails.minDiscountIntError);
        setSaveDisabled(true);
        return;
      }

      if (value > 100) {
        setValidationError(locale.preferenceDetails.minDiscountPersentError);
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
        setValidationError(locale.preferenceDetails.minRatingIntError);
        setSaveDisabled(true);
        return;
      }

      if (value > 5) {
        setValidationError(locale.preferenceDetails.minRatingArrangeError);
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
        setValidationError(locale.preferenceDetails.priceFromIntError);
        setSaveDisabled(true);
        return;
      }

      if (
        preferenceDetails.priceTo != null &&
        value >= preferenceDetails.priceTo
      ) {
        setValidationError(locale.preferenceDetails.priceFromLessThanToError);
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
        setValidationError(locale.preferenceDetails.priceToIntError);
        setSaveDisabled(true);
        return;
      }

      if (value <= preferenceDetails.priceFrom) {
        setValidationError(locale.preferenceDetails.priceFromLessThanToError);
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
      tg.showPopup(
        { title: title, message: message },
        backButtonClickedHandler
      );
    } else {
      backButtonClickedHandler();
    }
  };

  const onSave = async () => {
    setIsSaving(true);
    await upsertPreference(userId, preferenceDetails);
    setIsSaving(false);

    showPopup(locale.preferenceDetails.onSavePopupTitle, locale.preferenceDetails.onSavePopupMessage);
    setSaveVisible(false);
  };

  const loadingDom = <h3 className="loading">{locale.preferenceDetails.loading}</h3>;
  const savingDom = <h3 className="loading">{locale.preferenceDetails.saving}</h3>;
  const saveButtonDom = saveVisible ? (
    isSaving ? (
      savingDom
    ) : (
      <Button
        title={locale.preferenceDetails.onSaveBtnTitle}
        onClick={onSave}
        isDisabled={saveDisabled}
      />
    )
  ) : skipVisible ? (
    <Button title={locale.preferenceDetails.skipBtnTitle} onClick={backButtonClickedHandler} />
  ) : (
    <></>
  );

  const prefDetailsDom = (
    <>
      <h1>{preferenceDetails.categoryName}</h1>
      <section>
        <DetailsItem
          label={locale.preferenceDetails.minDiscountLabel}
          value={preferenceDetails.minDiscount}
          onChange={minDiscountOnChange}
        />
        <DetailsItem
          label={locale.preferenceDetails.minRatingLabel}
          value={preferenceDetails.minRating}
          onChange={minRatingOnChange}
        />
        <DetailsItem
          label={locale.preferenceDetails.priceFromLabel}
          value={preferenceDetails.priceFrom}
          onChange={priceFromOnChange}
        />
        <DetailsItem
          label={locale.preferenceDetails.priceToLabel}
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
          ? locale.preferenceDetails.noPreference
          : prefDetailsDom}
      </div>
    </>
  );
}

export default PreferenceDetails;
