const isValidParametersPost = (data) => {
  const parameters = ["id_advisor", "id_type_movement", "date_order", "parts"];

  // validate if parameters are in data
  const hasAllParameters = parameters.every((param) => param in data);
  if (!hasAllParameters) {
    return false;
  }

  // validate if parts is array, not empty and for each element have structure
  if (!Array.isArray(data.parts) || data.parts.length === 0) {
    return false;
  }

  for (const part of data.parts) {
    if (
      typeof part.id_part === "undefined" ||
      typeof part.amount === "undefined"
    ) {
      return false;
    }
  }

  return true;
};
