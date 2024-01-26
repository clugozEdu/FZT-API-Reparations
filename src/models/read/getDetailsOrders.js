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
  // Maps for acces by ID
  const ordersMap = new Map(orders.map((o) => [o.id_order, o]));
  const typeMovementsMap = new Map(
    type_movements.map((tm) => [tm.id_movements, tm])
  );
  const storesMap = new Map(stores.map((s) => [s.id_store, s]));
  const advisorsMap = new Map(advisors.map((a) => [a.id_advisor, a]));
  const stockPartsMap = new Map(stock_parts.map((sp) => [sp.id_part, sp]));
  const logsOrdersMap = new Map(
    logs_orders.map((log) => [log.id_detail_order, log])
  );

  // Filter detail_order if specificIdOrders is not empty
  const filteredDetailOrders =
    specificIdOrders?.length > 0
      ? detail_orders.filter((detailOrder) =>
          specificIdOrders.includes(detailOrder.id_order)
        )
      : detail_orders;

  // Build data to return
  return filteredDetailOrders.map((detailOrder) => {
    const order = ordersMap.get(detailOrder.id_order);
    const typeMovement = order
      ? typeMovementsMap.get(order.id_movements)
      : null;
    const store = order ? storesMap.get(order.id_store) : null;
    const advisor = store ? advisorsMap.get(store.id_advisor) : null;
    const stockPart = stockPartsMap.get(detailOrder.id_part);
    const logOrder = logsOrdersMap.get(detailOrder.id_order);

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
  const stores = getSheetData(BD, ssStore);
  const type_movements = getSheetData(BD, ssTypeMovements);
  const stock_parts = getSheetData(BD, ssStockParts);
  const detail_orders = getSheetData(BD, ssDetailOrders);
  const orders = getSheetData(BD, ssOrders);
  const logs_orders = getSheetData(BD, ssMovement);
  const advisors = getSheetData(BD, ssAdvisors);

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

  console.log(result);

  if (result.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "orders not found",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "orders details",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};

const test33 = () => {
  console.log(getDetailsOrders([3]));
};
