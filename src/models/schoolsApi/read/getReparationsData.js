const reparationsJoinParts = (
  parts,
  typeIncidences,
  levelIncidences,
  partsReparation
) => {
  const partsLookup = createLookup(parts, "id_part");
  const typeIncidencesLookup = createLookup(typeIncidences, "id");
  const levelIncidencesLookup = createLookup(levelIncidences, "id");

  return partsReparation.map((partsRep) => {
    // get typeIncidences
    const incidences = typeIncidencesLookup[partsRep.id_incidence];
    const levelIncidences = levelIncidencesLookup[partsRep.id_level_incidence];
    const parts = partsLookup[partsRep.id_parts];

    return {
      id_parts: parts?.id_part ?? "",
      id_incidence: incidences?.id ?? "",
      name_incidence: incidences?.name_incidence ?? "",
      id_level_incidence: levelIncidences?.id ?? "",
      name_level_incidence: levelIncidences?.name_level_incidence ?? "",
    };
  });
};

const mainReparations = () => {
  const dataParts = getSheetData(BD, ssStockParts);
  const dataIncidences = getSheetData(BD, ssTypeIncidences);
  const dataLevelIncidences = getSheetData(BD, ssLevelIncidences);
  const dataJoinParts = getSheetData(BD, ssJoinPartsRep);

  const data = reparationsJoinParts(
    dataParts,
    dataIncidences,
    dataLevelIncidences,
    dataJoinParts
  );

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
        details: "details the parts",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
