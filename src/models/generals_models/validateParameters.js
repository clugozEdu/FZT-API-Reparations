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

// JSON TEST FOR SCHOOLS
const jsonSchools = {
  schools: [
    {
      id_school: 1,
      name: "Escuela de Prueba",
      departament: "Managua",
      municipality: "Managua",
      code_unique: 123445,
      serials: [
        {
          id_school: 1,
          serial: "CQF44600202",
          studends: "José López",
          grade: "1ro",
          section: "A",
        },
        {
          id_school: 1,
          serial: "CQF44600202",
          studends: "José López",
          grade: "1ro",
          section: "A",
        },
      ],
    },
    {
      id_school: 2,
      name: "Escuela de Prueba 2",
      departament: "Chinandega",
      municipality: "El Viejo",
      code_unique: 101010,
      serials: [
        {
          id_school: 2,
          serial: "CQF44600202",
          studends: "José López",
          grade: "1ro",
          section: "A",
        },
        {
          id_school: 2,
          serial: "CQF44600202",
          studends: "José López",
          grade: "1ro",
          section: "A",
        },
      ],
    },
  ],
};

// JSON TEST PARTS
const jsonParts = {
  parts: [
    {
      id_part: 1,
      id_incidence: 1,
      incidence_name: "Uso",
      id_level_incidence: 1,
      level_incidence_name: "Leve",
    },
    {
      id_part: 1,
      id_incidence: 2,
      incidence_name: "Daño",
      id_level_incidence: 1,
      level_incidence_name: "Leve",
    },
  ],
};
