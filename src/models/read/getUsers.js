// get users from BD
const getUsers = (emails) => {
  let data = getSheetData(BD, ssAdvisors);
  let result = [];

  // Convert the email array into a set for more efficient searching
  const emailSet = new Set(emails);

  // Iterate only once over each user in 'data'
  data.forEach((item) => {
    // Check if the user's email is in the 'emailSet'
    if (emailSet.has(item.email_advisor)) {
      result.push(item);
    }
  });

  // Build the response
  if (result.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "users not found",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "users",
        data: result,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
