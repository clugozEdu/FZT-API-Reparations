const joinAdvisorParts = (dataParts, stockPart, sheetData, storesData) => {
  const sheet = BDInfo.getSheetByName(storesData.name_store_short);

  let rowsValidate = [];
  let rows = [];

  // get data Sheet
  const dataConciliation = sheetData;
  const partsLookup = createLookup(dataParts, "id_part");

  stockPart.forEach((part) => {
    if (part.id_store === storesData.id_store) {
      const dataPart = partsLookup[part.id_part];

      if (dataPart.status_part != "Nuevo") return;

      rowsValidate.push([
        dataPart.id_part,
        dataPart.name_part,
        part.stock_part,
      ]);
    }
  });

  // update conciliation
  updatePartsArray(rowsValidate, dataConciliation);

  // create data for BD
  dataConciliation.forEach((data) => {
    rows.push(Object.values(data));
  });

  // clear sheet data
  sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clear();

  // set data in sheet
  sheet
    .getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length)
    .setValues(rows);
};

function updatePartsArray(dataArray, partsArray) {
  let executionDate = new Date();

  // Inicialmente, marcar todos los partes en partsArray como no actualizados.
  partsArray.forEach((part) => {
    Object.keys(part).forEach((key) => {
      let date = new Date(key);
      if (
        !isNaN(date.getTime()) &&
        date.getMonth() === executionDate.getMonth() &&
        date.getFullYear() === executionDate.getFullYear()
      ) {
        part[key] = 0;
      }
    });
  });

  dataArray.forEach((data) => {
    partsArray.forEach((part) => {
      if (part.id_part == data[0]) {
        for (var key in part) {
          let date = new Date(key);
          if (!isNaN(date.getTime())) {
            if (
              date.getMonth() === executionDate.getMonth() &&
              date.getFullYear() === executionDate.getFullYear()
            ) {
              part[key] = data[2];
            }
          }
        }
      }
    });
  });
}

const generateAdvisorsParts = () => {
  const dataParts = getSheetData(BD, ssStockParts);
  const stockPart = getSheetData(BD, ssDetailStore);
  const storesData = getSheetData(BD, ssStore);

  storesData.forEach((store) => {
    try {
      const sheetData = getSheetData(BDInfo, store.name_store_short);
      if (!sheetData) {
        console.log(`La hoja ${store.name_store_short} no existe.`);
        return;
      }
      joinAdvisorParts(dataParts, stockPart, sheetData, store);
    } catch (error) {
      console.error(
        `Error procesando la bodega ${store.name_store_short}: ${error}`
      );
    }
  });
};
