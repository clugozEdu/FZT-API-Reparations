// get stores details data
const getStores = () => {
  let data = getSheetData(BD, ssStore);

  if (data.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: ["error"],
        details: "stores not found",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: "stores",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
