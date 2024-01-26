const getMovements = () => {
  const data = getSheetData(BD, ssTypeMovements);

  try {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "type_movements",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "error",
        data: error,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
