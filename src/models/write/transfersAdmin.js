const getOrderAdmin = (dataOrder, idOrder) => {
  const data = readSheetData(ssOrders, 8);
  let storeEntry = dataOrder.id_store_entry;
  let storeExit = dataOrder.id_store_exit;
  let idMovement;
  let storeCentral;

  data.forEach((row) => {
    if (row[0] === idOrder) {
      idMovement = row[3];
      storeCentral = row[7];
      // call function to get all data of order
      joinOrderAdmin(idOrder, idMovement, storeEntry, storeExit, storeCentral);
    }
  });

  return [idOrder, idMovement, storeCentral];
};

const joinOrderAdmin = (
  idOrder,
  idMovement,
  storeEntry,
  storeExit,
  storeCentral
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

    // transfers admin
    if (idMovements == 4) {
      // entry store central
      updateStoreCentral(idPart, amount, true);
      createLogMovement(element.id_detail_order, false, idStoreCentral);
    } else if (idMovements == 3) {
      // transfers stores to stores
      if (idStoreExit === idStoreCentral) {
        // transfers stores admin to stores advisor
        updateStoreCentral(idPart, amount, false);
        updateStoreAdvisor(idPart, amount, idStoreEntry, true);
        createLogMovement(
          element.id_detail_order,
          idStoreCentral,
          idStoreEntry
        );
      } else {
        // transfers stores advisor to stores advisor
        updateStoreAdvisor(idPart, amount, idStoreEntry, true);
        updateStoreAdvisor(idPart, amount, idStoreExit, false);
        createLogMovement(element.id_detail_order, idStoreExit, idStoreEntry);
      }
    } else if (idMovements == 2) {
      // exit store central
      updateStoreCentral(idPart, amount, false);
      createLogMovement(element.id_detail_order, idStoreCentral, false);
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

  return `Orden creada con éxito, su número de orden es: ${idOrder}`;
};

const dataTest = {
  id_advisor: 6,
  context: "transfersAdmin",
  id_store_entry: 1,
  id_store_exit: 2,
  approved: true,
  attends: true,
  id_type_movement: 3,
  date_order: "25/01/2024",
  parts: [
    {
      id_part: 2,
      amount: 10,
    },
    {
      id_part: 5,
      amount: 10,
    },
  ],
};

const tesasdft = () => {
  setTransfersAdmin(dataTest);
};
