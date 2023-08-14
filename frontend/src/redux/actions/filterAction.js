const getDistinctIds = (products, key) => {
  return [...new Set(products.map((product) => product[key]))];
};

const filterCategories = (products) => {
  const categoriesIds = getDistinctIds(products, "category");
};
