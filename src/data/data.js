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
