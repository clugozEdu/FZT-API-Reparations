const createOrder = (data) => {
  // validate if contexts is admin or advisors
  let attends = data.context !== "transfersAdmin" ? false : true;
  let approved = data.context !== "transfersAdmin" ? false : true;
  let dateUpdate =
    data.context !== "transfersAdmin"
      ? "No update"
      : Utilities.formatDate(new Date(), "GMT-6", "dd/MM/yyyy");
  // get data the for order
  const sheet = BD.getSheetByName(ssOrders);
  const idOrder = generateId(sheet);
  const idTypeMovement = data.id_type_movement;
  const date_order = data.date_order;
  const dateRegister = Utilities.formatDate(new Date(), "GMT-6", "dd/MM/yyyy");
  //const dateUpdate = "No update";
  const idStore = getIdStoreForAdvisor(data.id_advisor);

  const order = [
    idOrder,
    attends,
    approved,
    idTypeMovement,
    date_order,
    dateRegister,
    dateUpdate,
    idStore[0],
  ];

  sheet.appendRow(order);

  return idOrder;
};

const generateDetailOrder = (idOrder, data) => {
  const sheet = BD.getSheetByName(ssDetailOrders);
  const parts = data.parts;

  parts.forEach((element) => {
    const idDetailOrder = generateId(sheet);
    const idPart = element.id_part;
    const amount = element.amount;
    const detailOrder = [idDetailOrder, idOrder, idPart, amount];
    sheet.appendRow(detailOrder);
  });
};

const mainOrder = (data) => {
  const idOrder = createOrder(data);
  generateDetailOrder(idOrder, data);

  return `Orden creada con éxito, su número de orden es: ${idOrder}`;
};
