// BD reparations
const BD = SpreadsheetApp.openById(
  "1G5-5uE-OJPtkA3lIpe_uG3r66HCI_p3nxZ4aQW0vmxA"
);

// globals variables
const ssStore = "stores";
const ssAdvisors = "advisors";
const ssStockParts = "stock_parts";
const ssDetailStore = "detail_stores";
const ssOrders = "orders";
const ssDetailOrders = "detail_orders";
const ssTypeMovements = "type_movements";
const ssMovement = "logs_movements";
// const testStockParts = "test_stock_parts";
// const testDetailStore = "test_detail_stores";

// get data from sheet and return object with headers how keys
const getSheetData = (nameSpreadSheet, nameSheet) => {
  let data = [];
  const sheet = nameSpreadSheet.getSheetByName(nameSheet);
  let rows = sheet.getDataRange().getValues();

  let headers = rows[0];

  for (let i = 1; i < rows.length; i++) {
    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    data.push(obj);
  }
  return data;
};

// set data in BD
const setDataInBD = (nameSpreadSheet, nameSheet, data) => {
  const sheet = nameSpreadSheet.getSheetByName(nameSheet);

  sheet.appendRow(data);
};

/// function post read data in sheet
const readSheetData = (sheetName, numColumns) => {
  const sheet = BD.getSheetByName(sheetName);

  // Verificar si la hoja está vacía o solo tiene encabezados
  if (sheet.getLastRow() <= 1) {
    return []; // Devolver un arreglo vacío si no hay datos
  }

  // Si hay datos, obtenerlos y devolverlos
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, numColumns).getValues();
};

// set data in sheet POST
const writeSheetData = (sheetName, data) => {
  const sheet = BD.getSheetByName(sheetName);
  sheet.getRange(2, 1, data.length, data[0].length).setValues(data);
};

// create lookup object an array
const createLookup = (array, key) => {
  const lookup = {};
  array.forEach((item) => {
    lookup[item[key]] = item;
  });
  return lookup;
};

// get advisor for store
const advisorsStores = (idStore) => {
  const data = getSheetData(BD, ssStore);

  // find store
  const resultStore = data.find((row) => row.id_store === idStore);

  // validate if store exist
  if (!resultStore) {
    return []; // O manejar el caso de no encontrar nada de manera adecuada
  }

  // get advisors
  const advisor = getSheetData(BD, ssAdvisors);

  // find advisors for store
  const resultAdvisor = advisor.filter(
    (row) => row.id_advisor === resultStore.id_advisor
  );

  return resultAdvisor[0].id_advisor;
};
