const updateOrder = (dataOrder) => {
  const data = readSheetData(ssOrders, 8);
  let idOrder;
  let contextPost = dataOrder.context;

  // update data or BD orders
  const updateData = data.map((row) => {
    if (row[0] === dataOrder.id_order) {
      row[1] = dataOrder.attends;
      row[2] = dataOrder.approved;
      row[6] = dataOrder.date_update;
      idOrder = row[0];

      // call function to get all data of order
      joinOrder(idOrder, row[7], row[3], contextPost);
    }
    return row;
  });
  // set changes in BD
  writeSheetData(ssOrders, updateData);

  // return id order and context for message of response
  return [idOrder, contextPost];
};

// get all data of order
const joinOrder = (idOrder, idStore, idMovements, contextPost) => {
  const context = contextPost;
  const data = readSheetData(ssDetailOrders, 4);
  // filter data for id order
  let resultOrders = data
    .filter((row) => row[1] === idOrder)
    .map((row) => ({
      id_detail_order: row[0],
      id_movements: idMovements,
      id_part: row[2],
      amount: row[3],
      id_store: idStore,
    }));

  // call function to update stores with array of data of order and context for update
  updateStores(resultOrders, context);
};

// set data in stores for context and movements
const updateStores = (order_details, contextPost) => {
  // for each detail of order and set data in stores
  order_details.forEach((element) => {
    const idPart = element.id_part;
    const amount = element.amount;
    const idMovements = element.id_movements;
    const idStore = element.id_store;
    const id_detail_order = element.id_detail_order;
    const idStoreAdmin = 6;
    const idAdvisorAdmin = advisorsStores(idStoreAdmin);
    const idStoreLow = 8;

    // context aproved order
    if (contextPost === "approvedOrder") {
      // movements 1: request the parts to central
      if (idMovements === 1) {
        updateStoreAdvisor(idPart, amount, idStoreAdmin, false);
        updateStoreAdvisor(idPart, amount, idStore, true);
        createLogMovement(
          id_detail_order,
          idStoreAdmin,
          idStore,
          idAdvisorAdmin
        );
        // movents 2: request the low parts for advisor
      } else if (idMovements === 2) {
        updateStoreAdvisor(idPart, amount, idStore, false);
        updateStoreAdvisor(idPart, amount, idStoreLow, true);
        createLogMovement(id_detail_order, idStore, idStoreLow, idAdvisorAdmin);
      }
      // context rejected order
    } else if (contextPost === "rejectedOrder") {
      // generate logs for type movements
      if (idMovements === 1) {
        createLogMovement(
          id_detail_order,
          idStoreAdmin,
          idStore,
          idAdvisorAdmin
        );
      } else if (idMovements === 2) {
        createLogMovement(id_detail_order, idStore, idStoreLow, idAdvisorAdmin);
      }
    }
  });
};

// update stores for advisors
const updateStoreAdvisor = (idPart, amount, idStore, isAdding) => {
  const sheetDetailStore = BD.getSheetByName(ssDetailStore);
  const idDetailStore = generateId(sheetDetailStore);
  const data = readSheetData(ssDetailStore, 4);
  // validation for new register
  let found = false;
  // find part in store for advisor and update amount
  const updatedData = data.map((row, index) => {
    if (row[2] === idPart && row[1] === idStore) {
      found = true;
      row[3] = isAdding ? row[3] + amount : row[3] - amount;
    }
    return row;
  });

  // if not found part in store for advisor, create new register
  if (!found) {
    updatedData.push([idDetailStore, idStore, idPart, amount]);
  }

  // set changes in BD
  writeSheetData(ssDetailStore, updatedData);
};

// // update stores for central
// const updateStoreCentral = (idPart, amount, isAdding) => {
//   const data = readSheetData(testStockParts, 6);
//   // validation for new register
//   let found = false;

//   // find part in store for central and update amount
//   const updatedData = data.map((row) => {
//     if (row[0] === idPart) {
//       found = true;
//       row[5] = isAdding ? row[5] + amount : row[5] - amount;
//     }
//     return row;
//   });

//   // if not found part in store for central, create new register
//   if (!found) {
//     updatedData.push([idPart, amount]);
//   }
//   // set changes in BD
//   writeSheetData(testStockParts, updatedData);
// };

// create logs of movements
const createLogMovement = (
  idDetailOrder,
  idStoreExit,
  idStoreEntry,
  idAdvisorAdmin
) => {
  const sheet = BD.getSheetByName(ssMovement);
  // generate id for movement
  const idMovement = generateId(sheet);
  const dateMovement = Utilities.formatDate(new Date(), "GMT-6", "dd/MM/yyyy");

  // data to set in BD
  const logMovement = [
    idMovement,
    idDetailOrder,
    idStoreExit,
    idStoreEntry,
    dateMovement,
    idAdvisorAdmin,
  ];

  // set changes in BD
  sheet.appendRow(logMovement);
};

// main updates orders
const mainUpdateOrder = (data) => {
  // call function to update orders and get return
  const dataOrder = updateOrder(data);
  // get id order and context for message of response
  const idOrder = dataOrder[0];
  let context = dataOrder[1] === "approvedOrder" ? "aprobada" : "rechazada";

  // try catch for errors
  try {
    // return message of response
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: `Orden ${idOrder} ${context} con exito`,
        idOrder: idOrder,
      })
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [error.error],
        details: `Orden ${idOrder} ${context} con exito`,
        idOrder: idOrder,
      })
    );
  }
};
