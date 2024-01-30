const doPost = (e) => {
  let params = JSON.parse(e.postData.contents);

  try {
    const typeRegister = params.context;

    switch (typeRegister) {
      case "createOrder":
        let result = mainOrder(params);
        return result;
      case "approvedOrder":
      case "rejectedOrder":
        let resultupdateOrder = mainUpdateOrder(params);
        return resultupdateOrder;
      case "transfersAdmin":
        let resultTransfersAdmin = setTransfersAdmin(params);
        return resultTransfersAdmin;

      default:
        return ContentService.createTextOutput(
          "El tipo de registro no es válido"
        );
    }
  } catch (error) {
    return ContentService.createTextOutput(
      "Error al parsear el JSON: " + error.message
    );
  }
};
