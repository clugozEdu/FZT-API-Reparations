const getOrderAdmin = (dataOrder, idOrder) => {
  const data = readSheetData(ssOrders, 8);
  let storeEntry = dataOrder.id_store_entry;
  let storeExit = dataOrder.id_store_exit;
  let idAdvisorLogin = dataOrder.id_advisor;
  let idMovement;
  let storeCentral;

  data.forEach((row) => {
    if (row[0] === idOrder) {
      idMovement = row[3];
      storeCentral = row[7];
      // call function to get all data of order
      joinOrderAdmin(
        idOrder,
        idMovement,
        storeEntry,
        storeExit,
        storeCentral,
        idAdvisorLogin
      );
    }
  });

  return [idOrder, idMovement, storeCentral];
};

const joinOrderAdmin = (
  idOrder,
  idMovement,
  storeEntry,
  storeExit,
  storeCentral,
  advisorLogin
) => {
  const data = readSheetData(ssDetailOrders, 4);
  // filter data for id order
  let resultOrders = data
    .filter((row) => row[1] === idOrder)
    .map((row) => ({
      id_strore_central: storeCentral,
      id_detail_order: row[0],
      id_movements: idMovement,
      id_part: row[2],
      amount: row[3],
      id_store_entry: storeEntry,
      id_store_exit: storeExit,
      id_advisor_login: advisorLogin,
    }));

  // call function to update stores with array of data of order and context for update
  updateStoresAdmin(resultOrders);
};

// set data in stores for context and movements
const updateStoresAdmin = (orderDetails) => {
  orderDetails.forEach((element) => {
    const idPart = element.id_part;
    const amount = element.amount;
    const idMovements = element.id_movements;
    const idStoreEntry = element.id_store_entry;
    const idStoreExit = element.id_store_exit;
    const idStoreCentral = element.id_strore_central;
    const advisor = element.id_advisor_login;

    // transfers admin
    if (idMovements == 4) {
      // entry store central
      updateStoreAdvisor(idPart, amount, idStoreCentral, true);
      createLogMovement(element.id_detail_order, "", idStoreCentral, advisor);
    } else if (idMovements == 3) {
      // transfers stores to stores
      // transfers stores admin to stores advisor
      updateStoreAdvisor(idPart, amount, idStoreExit, false);
      updateStoreAdvisor(idPart, amount, idStoreEntry, true);
      createLogMovement(
        element.id_detail_order,
        idStoreExit,
        idStoreEntry,
        advisor
      );
    } else if (idMovements == 2) {
      // exit store central
      updateStoreAdvisor(idPart, amount, idStoreCentral, false);
      updateStoreAdvisor(idPart, amount, 8, true);
      createLogMovement(element.id_detail_order, idStoreCentral, 8, advisor);
    }
  });
};

const setTransfersAdmin = (data) => {
  // generate order
  const idOrder = createOrder(data);
  // generate detail order
  generateDetailOrder(idOrder, data);
  // set data admin
  getOrderAdmin(data, idOrder);

  // try and catch for error
  try {
    // return data
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: `Orden ${idOrder} creada con exito`,
        idOrder: idOrder,
      })
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [error.message],
        details: "Error al crear la orden",
      })
    );
  }
};
