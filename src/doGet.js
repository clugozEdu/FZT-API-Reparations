const doGet = (e) => {
  let context = e.parameter.context;

  try {
    switch (context) {
      case "getStoreData":
        const id_advisors = e.parameters.id_advisors;
        return getStoresData(id_advisors);
      case "getUsers":
        const email_users = e.parameters.email_users;
        return getUsers(email_users);
      case "getStores":
        return getStores();
      case "getDetailsPart":
        return getDetailsPart();
      case "getMovements":
        return getMovements();
      case "getOrders":
        const statusParameters = e.parameters.status;
        const status = statusParameters.map(
          (statusString) => statusString === "true"
        );
        return getOrders(status);
      case "getDetailsOrders":
        const idOrdersParam = e.parameters.id_order;
        let specificIdOrders = [];

        if (idOrdersParam && Array.isArray(idOrdersParam)) {
          specificIdOrders = idOrdersParam
            .map((idStr) => parseInt(idStr.trim(), 10))
            .filter((id) => !isNaN(id));
        }
        return getDetailsOrders(specificIdOrders);

      // Schools api
      case "getDataSchools":
        return getDataSchools();

      case "getDetailPartsReparation":
        return mainReparations();

      case "getRepairsRecords":
        return getRepairsRecords(e.parameters.id_advisor);

      case "getRepairsDetails":
        return getRepairsDetails(e.parameters.id_repair);

      default:
        throw new Error("Context not found");
    }
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        details: "error",
        data: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
