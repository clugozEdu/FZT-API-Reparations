const BD = SpreadsheetApp.openById(
  "1G5-5uE-OJPtkA3lIpe_uG3r66HCI_p3nxZ4aQW0vmxA"
);

const ssStore = "stores";
const ssAdvisors = "advisors";
const ssStockParts = "stock_parts";
const ssDetailStore = "detail_stores";
const ssOrders = "orders";
const ssDetailOrders = "detail_orders";
const ssTypeMovements = "type_movements";
const ssMovement = "logs_movements";
const testStockParts = "test_stock_parts";
const testDetailStore = "test_detail_stores";

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

const setDataInBD = (nameSpreadSheet, nameSheet, data) => {
  const sheet = nameSpreadSheet.getSheetByName(nameSheet);

  sheet.appendRow(data);
};

/// function post
const readSheetData = (sheetName, numColumns) => {
  const sheet = BD.getSheetByName(sheetName);
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, numColumns).getValues();
};

const writeSheetData = (sheetName, data) => {
  const sheet = BD.getSheetByName(sheetName);
  sheet.getRange(2, 1, data.length, data[0].length).setValues(data);
};

const deleteRowsFromSheet = (sheetName, rowsToDelete) => {
  const sheet = BD.getSheetByName(sheetName);

  // Ordenar los índices de las filas en orden descendente para evitar problemas con los índices cambiantes
  rowsToDelete.sort((a, b) => b - a);

  // Eliminar filas de atrás hacia adelante
  rowsToDelete.forEach((row) => {
    sheet.deleteRow(row);
  });
};
