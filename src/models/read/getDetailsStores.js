// create lookup object an array
const createLookup = (array, key) => {
  const lookup = {};
  array.forEach((item) => {
    lookup[item[key]] = item;
  });
  return lookup;
};

// helper function to add result to the array
const addResult = (result, advisor, store, stock_part, detail) => {
  if (!store || !stock_part || detail.stock_part === 0) return;

  result.push({
    store: store.name_store,
    id_store: store.id_store,
    advisor: advisor.name_advisor,
    id_part: stock_part.id_part,
    name_part: stock_part.name_part,
    status_part: stock_part.status_part,
    origin_part: stock_part.origin_part,
    stock_part: detail.stock_part,
    cost_part: stock_part.cost_part,
  });
};

// main funciton to join multiple tables
const joinTables = (
  stores,
  advisors,
  stock_parts,
  detail_stores,
  id_advisors
) => {
  // create lookup object for each table
  const storeLookup = createLookup(stores, "id_store");
  const stockPartLookup = createLookup(stock_parts, "id_part");
  const advisorLookup = createLookup(advisors, "id_advisor");

  let result = [];

  id_advisors.forEach((id_advisor) => {
    const advisor = advisorLookup[id_advisor];
    if (!advisor) return;

    // if admin, add all stores
    if (advisor.role_user === "admin") {
      detail_stores.forEach((detail) => {
        addResult(
          result,
          advisor,
          storeLookup[detail.id_store],
          stockPartLookup[detail.id_part],
          detail
        );
      });

      // add all stock parts from central store
      stock_parts.forEach((stock_part) => {
        result.push({
          store: "Bodega Central",
          id_store: 6,
          advisor: advisor.name_advisor,
          id_part: stock_part.id_part,
          name_part: stock_part.name_part,
          status_part: stock_part.status_part,
          origin_part: stock_part.origin_part,
          stock_part: stock_part.stock_part,
          cost_part: stock_part.cost_part,
        });
      });
    } else {
      // for not admin users, add only stores that belong to the user
      detail_stores.forEach((detail) => {
        const store = storeLookup[detail.id_store];
        if (store && store.id_advisor === advisor.id_advisor) {
          // add result if the store belongs to the user
          addResult(
            result,
            advisor,
            store,
            stockPartLookup[detail.id_part],
            detail
          );
        }
      });
    }
  });

  return result;
};

// Get stores data
const getStoresData = (id_advisor) => {
  const stores = getSheetData(BD, ssStore);
  const advisors = getSheetData(BD, ssAdvisors);
  const stock_parts = getSheetData(BD, ssStockParts);
  const detail_stores = getSheetData(BD, ssDetailStore);

  const result = joinTables(
    stores,
    advisors,
    stock_parts,
    detail_stores,
    id_advisor
  );

  // validate result and set response
  if (result.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "stores not found",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "stores",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};

function test() {
  console.log(getStoresData("2"));
}
