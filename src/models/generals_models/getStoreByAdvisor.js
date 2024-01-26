const getIdStoreForAdvisor = (id_advisor) => {
  const store = getSheetData(BD, ssStore);
  let result = [];

  store.forEach((element) => {
    if (element.id_advisor == id_advisor) {
      result.push(element.id_store);
    }
  });

  return result;
};

function testsss() {
  console.log(getStoreByAdvisor(2));
}
