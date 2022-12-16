// const baseUrl =
//   // "https://carposterapi-staging.azurewebsites.net";
//   "http://localhost:8080";

export async function getMyPreferencies(userId) {
  return [
    {
      categoryId: 123456,
      categoryName: "Хобби и рукоделие",
      minDiscount: 50,
      minRating: 4.6,
      priceFrom: 1,
      priceTo: 5,
    },
    {
      categoryId: 334422,
      categoryName: "Рукоделие",
      minDiscount: 50,
      minRating: 4.6,
      priceFrom: 1,
      priceTo: 5,
    },
    {
      categoryId: 3345522,
      categoryName: "Телефоны",
      minDiscount: 50,
      minRating: 4.6,
      priceFrom: 1,
      priceTo: 5,
    },
    {
      categoryId: 3345521,
      categoryName: "Магнитофоны",
      minDiscount: 50,
      minRating: 4.6,
      priceFrom: 1,
      priceTo: 5,
    },
  ];

  // let url = baseUrl + "/api/vendors";

  // try {
  //   // get the data from the api
  //   const response = await fetch(url);
  //   return await response.json();
  // } catch (e) {
  //   console.log(e);
  //   return null;
  // }
}

export async function deleteFilter(userId, data) {
  console.log("" + userId + data);
}

export async function upsertPreference(userId, data) {
  console.log(data);
  // categoryId: 3345522,
  //   categoryName: "Телефоны",
  //   minDiscount: 50,
  //   minRating: 4.6,
  //   priceFrom: 1,
  //   priceTo: 5,
}

export async function getPreference(userId, categoryId) {
  return {
    categoryId: 3345522,
    categoryName: "Телефоны",
    minDiscount: 50,
    minRating: 4.6,
    priceFrom: 1,
    priceTo: 5,
  };
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
