// get Orders data
const getOrders = (status) => {
  const data = getSheetData(BD, ssOrders);
  let result = [];

  try {
    status.forEach((item) => {
      result = data.filter((order) => order.attends === item);
    });
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: "orders",
        data: result,
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
