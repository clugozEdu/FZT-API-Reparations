function generateId(sheet) {
  let lastRow = sheet.getLastRow();
  let lastId = lastRow > 1 ? sheet.getRange(lastRow, 1).getValue() : null;

  if (!lastId) return 1;
  return parseInt(lastId) + 1;
}
