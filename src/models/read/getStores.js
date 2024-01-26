const getStores = () => {
  let data = getSheetData(BD, ssStore);

  if (data.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "stores not found",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "stores",
        data: data,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
