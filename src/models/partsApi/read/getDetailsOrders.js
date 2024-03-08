const joinTablesOrders = (
  stores,
  type_movements,
  stock_parts,
  detail_orders,
  orders,
  advisors,
  logs_orders,
  specificIdOrders // array
) => {
  // create lookup for each sheets and find by keys
  const ordersLookup = createLookup(orders, "id_order");
  const typeMovementsLookup = createLookup(type_movements, "id_movements");
  const storesLookup = createLookup(stores, "id_store");
  const advisorsLookup = createLookup(advisors, "id_advisor");
  const stockPartsLookup = createLookup(stock_parts, "id_part");
  const logsOrdersLookup = createLookup(logs_orders, "id_detail_order");

  // find only detalis orders with the same id_order
  const filteredDetailOrders =
    specificIdOrders?.length > 0
      ? detail_orders.filter((detailOrder) =>
          specificIdOrders.includes(detailOrder.id_order)
        )
      : detail_orders;

  return filteredDetailOrders.map((detailOrder) => {
    // get detailOrder data
    const order = ordersLookup[detailOrder.id_order];
    const typeMovement = order ? typeMovementsLookup[order.id_movements] : null;
    // get store data
    const store = order ? storesLookup[order.id_store] : null;
    // get advisor data with id_advisor from store
    const advisor = store ? advisorsLookup[store.id_advisor] : null;
    // get stock part data
    const stockPart = stockPartsLookup[detailOrder.id_part];
    // get log order data
    const logOrder = logsOrdersLookup[detailOrder.id_detail_order];

    return {
      id_order: order?.id_order ?? null,
      attends: order?.attends ?? false,
      approved: order?.approved ?? false,
      type_movements: typeMovement?.name_movements ?? "",
      date_order: order?.date_order ?? "",
      date_update: order?.date_register ?? "",
      id_store: store?.id_store ?? null,
      name_store: store?.name_store ?? "",
      name_short_store: store?.name_store_short ?? null,
      id_detail_order: detailOrder.id_detail_order,
      id_part: detailOrder.id_part,
      name_part: stockPart?.name_part ?? "",
      amount: detailOrder.amount,
      id_store_exit: logOrder?.id_store_exit ?? null,
      id_store_entry: logOrder?.id_store_entry ?? null,
      advisor: advisor?.name_advisor ?? "",
      role_advisor: advisor?.role_user ?? null,
    };
  });
};

// Get details of orders
const getDetailsOrders = (id_order) => {
  // arrays for BD
  const stores = getSheetData(BD, ssStore);
  const type_movements = getSheetData(BD, ssTypeMovements);
  const stock_parts = getSheetData(BD, ssStockParts);
  const detail_orders = getSheetData(BD, ssDetailOrders);
  const orders = getSheetData(BD, ssOrders);
  const logs_orders = getSheetData(BD, ssMovement);
  const advisors = getSheetData(BD, ssAdvisors);

  // call joinTablesOrders with arguments arrays for BD
  const result = joinTablesOrders(
    stores,
    type_movements,
    stock_parts,
    detail_orders,
    orders,
    advisors,
    logs_orders,
    id_order
  );

  // validate result and create text output for google
  if (result.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: ["error"],
        details: "orders not found",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: "orders details",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
