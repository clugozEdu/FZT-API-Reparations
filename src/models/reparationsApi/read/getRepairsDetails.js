const getRepairsDetails = (id) => {
  const reparations = getSheetData(BDRepairs, ssReparationsAdvisor);
  const repairsLookup = createLookUp(reparations, "id");

  if (repairsLookup[id]) return repairsLookup[id];
  else return "No data found";
};
