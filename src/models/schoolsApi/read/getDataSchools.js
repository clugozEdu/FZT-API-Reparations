// get data for schools in setting PIAR
const getDataSchools = () => {
  // arrays for BD Setting PIAR
  const data = getSheetData(BDSchools, ssSchools);
  const dataUser = getSheetData(BDSchools, ssUsers);

  let jsonSchools = {
    schools: [],
  };

  // for each for schools and find studens with same id_location
  data.forEach((school) => {
    let users = dataUser.filter(
      (user) => user.id_location === school.id_location
    );

    // omit school without studens
    if (users.length === 0) return;

    // set object with data for all schools
    let schoolData = {
      id_location: school.id_location,
      name: school.name_school,
      departament: school.department,
      municipality: school.municipality,
      code_unique: school.code_unique,
      serials: [],
    };

    // sset in object for all schools data with studens
    users.forEach((user) => {
      let userSchool = {
        id_school: user.id_location,
        id_user: user.id_user,
        serial: user.serial_assigned,
        studends: user.user_name,
        type: user.user_type,
        grade: user.grade,
        section: user.section,
      };
      schoolData.serials.push(userSchool);
    });
    // add the object principal
    jsonSchools.schools.push(schoolData);
  });

  // validate result and return text output for google
  if (jsonSchools.schools.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: ["error"],
        details: "schools not found",
        data: jsonSchools,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: [],
        details: "schools",
        data: jsonSchools,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
