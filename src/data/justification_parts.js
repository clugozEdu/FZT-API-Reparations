const joinJustification = (
  dataSchool,
  dataParts,
  dataAdvisors,
  dataJoinParts
) => {
  const sheet = BDInfo.getSheetByName(justificationParts);
  let rows = [];

  // clear sheet data
  sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clear();

  const partsLookup = createLookup(dataParts, "id_part");
  const advisorsLookup = createLookup(dataAdvisors, "id_advisor");
  const schoolLookup = createLookup(dataSchool, "id_location");

  dataJoinParts.forEach((partsRep) => {
    const dataPart = partsLookup[partsRep.id_part];
    const dataAdvisor = advisorsLookup[partsRep.id_advisor];
    const dataSchool = schoolLookup[partsRep.id_school];

    if (
      dataPart.status_part === "Buen Estado" ||
      dataPart.status_part === "Estado Medio" ||
      dataPart.status_part === "Usado"
    ) {
      return;
    }

    let cost_total = dataPart.cost_part * dataPart.type_the_change;

    const row = [
      dataSchool.municipality,
      dataSchool.name_school,
      partsRep.serial,
      partsRep.date_rep,
      dataPart.name_part,
      dataAdvisor.name_advisor,
      dataPart.origin_part,
      dataPart.cost_part,
      dataPart.type_the_change,
      cost_total,
    ];

    rows.push(row);
  });

  // set data in sheet
  sheet
    .getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length)
    .setValues(rows);
};

const generateJustificationParts = () => {
  // setting piar of data
  const dataSchool = getSheetData(BDSchools, ssSchools);

  // data the parts
  const dataParts = getSheetData(BD, ssStockParts);
  const dataAdvisors = getSheetData(BD, ssAdvisors);

  // data the join parts and reparations
  const dataJoinParts = getSheetData(BD, ssReparations);

  // call joinAllDataRepair with arguments arrays for BD
  const result = joinJustification(
    dataSchool,
    dataParts,
    dataAdvisors,
    dataJoinParts
  );

  return result;
};
