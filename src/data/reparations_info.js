const joinAllDataRepair = (
  dataSchool,
  dataUsers,
  dataParts,
  dataIncidences,
  dataLevelIncidences,
  dataAdvisors,
  dataStore,
  dataJoinParts
) => {
  const sheet = BDInfo.getSheetByName(reparationsInfo);
  let rows = [];
  let currentID = generateId(sheet);

  const partsLookup = createLookup(dataParts, "id_part");
  const typeIncidencesLookup = createLookup(dataIncidences, "id");
  const levelIncidencesLookup = createLookup(dataLevelIncidences, "id");
  const advisorsLookup = createLookup(dataAdvisors, "id_advisor");
  const storeLookup = createLookup(dataStore, "id_store");
  const usersLookup = createLookup(dataUsers, "id_user");
  const schoolLookup = createLookup(dataSchool, "id_location");

  dataJoinParts.forEach((partsRep) => {
    let idRepair = currentID++;
    // get typeIncidences
    const dataUser = usersLookup[partsRep.id_user];
    const dataPart = partsLookup[partsRep.id_part];
    const dataTypeIncidences = typeIncidencesLookup[partsRep.id_type_incidence];
    const dataLevelIncidences =
      levelIncidencesLookup[dataPart.id_level_incidence];
    const dataAdvisor = advisorsLookup[partsRep.id_advisor];
    const dataStore = storeLookup[partsRep.id_store];
    const dataSchool = schoolLookup[partsRep.id_school];

    const row = [
      idRepair,
      partsRep.id_repair_log,
      partsRep.serial,
      dataUser.id_user,
      dataUser.user_type,
      dataUser.user_name,
      dataUser.grade,
      dataUser.section,
      dataPart.id_part,
      dataPart.name_part,
      dataPart.status_part,
      dataPart.origin_part,
      dataTypeIncidences.id,
      dataTypeIncidences.name_incidence,
      dataLevelIncidences.id,
      dataLevelIncidences.name_level_incidence,
      partsRep.date_rep,
      dataAdvisor.id_advisor,
      dataAdvisor.name_advisor,
      dataStore.id_store,
      dataStore.name_store,
      dataSchool.id_location,
      dataSchool.country,
      dataSchool.region,
      dataSchool.department,
      dataSchool.municipality,
      dataSchool.town,
      dataSchool.name_school,
      dataSchool.code_unique,
      dataSchool.modality,
      dataSchool.dependency,
      dataSchool.school_type,
    ];

    rows.push(row);
  });

  // set data in sheet
  sheet
    .getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length)
    .setValues(rows);
};

const generateReparationsInfo = () => {
  // setting piar of data
  const dataSchool = getSheetData(BDSchools, ssSchools);
  const dataUsers = getSheetData(BDSchools, ssUsers);

  // data the parts
  const dataParts = getSheetData(BD, ssStockParts);
  const dataIncidences = getSheetData(BD, ssTypeIncidences);
  const dataLevelIncidences = getSheetData(BD, ssLevelIncidences);
  const dataAdvisors = getSheetData(BD, ssAdvisors);
  const dataStore = getSheetData(BD, ssStore);

  // data the join parts and reparations
  const dataJoinParts = getSheetData(BD, ssReparations);

  // call joinAllDataRepair with arguments arrays for BD
  const result = joinAllDataRepair(
    dataSchool,
    dataUsers,
    dataParts,
    dataIncidences,
    dataLevelIncidences,
    dataAdvisors,
    dataStore,
    dataJoinParts
  );

  return result;
};
