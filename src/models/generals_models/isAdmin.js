const isAdminAdvisor = (idAdvisor) => {
  const advisor = getSheetData(BD, ssAdvisors);
  const result = advisor.find((row) => row.id_advisor == idAdvisor);

  if (result && result.role_user === "admin") {
    return true;
  } else {
    return false;
  }
};
