const getRepairsRecords = (id) => {
  const reparations = getSheetData(BDRepairs, ssReparationsAdvisor);
  const data = dataJsonRepairs(reparations, id);

  if (data.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: ["error"],
        details: "details not found",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: "repairs records for advisor",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};

const dataJsonRepairs = (reparations, idAdvisor) => {
  let result = {
    id_advisor: idAdvisor,
    reparations: [],
  };

  if (idAdvisor !== 6) {
    reparations.forEach((reparation) => {
      if (reparation.id_advisor == idAdvisor) {
        addResultReparation(result, reparation);
      }
    });
  } else {
    reparations.forEach((reparation) => {
      addResultReparation(result, reparation);
    });
  }

  return result;
};

const addResultReparation = (result, reparation) => {
  if (!reparation) return;

  result.reparations.push({
    id_reparation: reparation.id,
    serial: reparation.serial,
    user_name: reparation.user_name,
    name_part: reparation.name_part,
    status_part: reparation.status_part,
    date_reparation: reparation.date_rep,
    department: reparation.department,
    municipality: reparation.municipality,
    name_school: reparation.name_school,
  });
};
