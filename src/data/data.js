const baseUrl = process.env.REACT_APP_BASE_URL;

// List of 
// public int CategoryId { get; set; }
// public string CategoryName { get; set; }
// public int? MinDiscount { get; set; }
// public double? MinRating { get; set; }
// public double? PriceFrom { get; set; }
// public double? PriceTo { get; set; }
export async function getMyPreferencies(userId) {
  let url = baseUrl + "/api/MyPreferences/" + userId;

  try {    
    const response = await fetch(url, {
      headers: {
        "x-functions-key": process.env.REACT_APP_MYPREFERENCES_API_KEY
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPreference(userId, categoryId) {
  let url = baseUrl + "/api/MyPreferences/" + userId + "/" + categoryId;

  try {    
    const response = await fetch(url, {
      headers: {
        "x-functions-key": process.env.REACT_APP_MYPREFERENCES_API_KEY
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deletePreference(userId, data) {
  let url = baseUrl + "/api/MyPreferences/" + userId;

  try {
    await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-functions-key": process.env.REACT_APP_MYPREFERENCES_API_KEY
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function upsertPreference(userId, data) {
  let url = baseUrl + "/api/MyPreferences/" + userId;

  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-functions-key": process.env.REACT_APP_MYPREFERENCES_API_KEY
      },
    });
  } catch (e) {
    console.log(e);
  }
}

// List of
// public int GroupId { get; set; }
// public string DisplayName { get; set; }
// public string Icon { get; set; }
// public int Order { get; set; }
export async function getAllGroups(userId) {
  let url = baseUrl + "/api/Groups/" + userId;

  try {    
    const response = await fetch(url, {
      headers: {
        "x-functions-key": process.env.REACT_APP_GROUPS_API_KEY
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getAllCategoriesForGroup(userId, groupId) {
  let url = baseUrl + "/api/Groups/" + userId + "/" + groupId;

  try {    
    const response = await fetch(url, {
      headers: {
        "x-functions-key": process.env.REACT_APP_GROUPS_API_KEY
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getWebUiLocalization(userId) {
  let url = baseUrl + "/api/WebUiLocalization/" + userId;

  try {    
    const response = await fetch(url, {
      headers: {
        "x-functions-key": process.env.REACT_APP_WEBUILOCALIZATION_API_KEY
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}