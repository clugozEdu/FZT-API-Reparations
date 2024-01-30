// Get details stores
const getDetailsPart = () => {
  let data = getSheetData(BD, ssStockParts);

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
