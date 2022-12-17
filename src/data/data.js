const baseUrl = process.env.REACT_APP_BASE_URL;

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

export async function getAllGroups() {
  return [
    {
      groupId: 202000054,
      icon: "📱",
      displayName: "Мобильные телефоны и аксессуары",
    },
    {
      groupId: 202004207,
      icon: "🍽",
      displayName: "Кухня, столовая и бар",
    },
    {
      groupId: 202040075,
      icon: "🪢",
      displayName: "Хобби и рукоделие",
    },
  ];
}

export async function getAllCategoriesForGroup(groupId) {
  return [
    {
      categoryId: 202000054,
      icon: "🍽",
      displayName: "Смартфоны",
    },
    {
      categoryId: 202004207,
      icon: "🍽",
      displayName: "Носимые устройства",
    },
    {
      categoryId: 202040075,
      icon: "🍽",
      displayName: "Наушники и гарнитуры",
    },
    {
      categoryId: 202060849,
      icon: "🍽",
      displayName: "Чехлы для смартфонов",
    },
    {
      categoryId: 202004969,
      icon: "🍽",
      displayName: "Стёкла и плёнки для телефонов",
    },
    {
      categoryId: 202001970,
      icon: "🍽",
      displayName: "Кабели для мобильных телефонов",
    },
  ];
}
