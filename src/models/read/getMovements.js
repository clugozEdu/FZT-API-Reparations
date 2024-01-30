// get movements details data
const getMovements = () => {
  const data = getSheetData(BD, ssTypeMovements);

  try {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: "type_movements",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [error],
        details: "error",
        data: error,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
