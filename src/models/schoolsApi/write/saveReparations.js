// function save reparations and update stores for advisors parts
const saveReparation = (data) => {
  // get sheet
  const sheet = BD.getSheetByName(ssReparations);
  let rows = [];
  let currentID = generateId(sheet);
  let result = [];

  let dateRegister = data.date_repair;
  let advisor = data.id_advisor;
  let idStore = data.id_store;

  data.reparations.forEach((dataRep) => {
    dataRep.parts.forEach((parts) => {
      let idRepair = currentID++;
      // create data for BD
      const row = [
        idRepair,
        dataRep.id_school,
        dataRep.id_user,
        dataRep.serial,
        parts.id_part,
        parts.id_incidence,
        dateRegister,
        advisor,
        idStore,
      ];

      // validate if need_stock
      if (parts.need_stock) {
        // update stores for advisors
        updateStoreAdvisor(parts.id_part, 1, data.id_store, false);
      }

      // save data
      rows.push(row);
      // push data for content.services.output
      result.push({
        id_reparation: idRepair,
        id_school: dataRep.id_school,
        id_user: dataRep.id_user,
        serial: dataRep.serial,
        id_part: parts.id_part,
        id_incidence: parts.id_incidence,
      });
    });
  });

  // set data in sheet
  if (rows.length > 0) {
    sheet
      .getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length)
      .setValues(rows);
  }

  // validate result and return text output for google
  if (result.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: ["error"],
        details: "reparations not found",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: "Reparaciones guardadas con éxito",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
