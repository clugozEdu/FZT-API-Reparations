const doPost = (e) => {
  let params;

  try {
    params = JSON.parse(e.postData.contents);
  } catch (error) {
    return ContentService.createTextOutput(
      "Error al parsear el JSON: " + error.message
    );
  }

  try {
    // if (!isValidParametersPost(params)) {
    //   return ContentService.createTextOutput(
    //     "Parámetros incorrectos o insuficientes"
    //   );
    // }

    const typeRegister = params.context;

    switch (typeRegister) {
      case "createOrder":
        let result = mainOrder(params);
        return ContentService.createTextOutput(result);
      case "approvedOrder":
      case "rejectedOrder":
        let resultupdateOrder = mainUpdateOrder(params);
        return ContentService.createTextOutput(resultupdateOrder);
      case "transfersAdmin":
        let resultTransfersAdmin = setTransfersAdmin(params);
        return ContentService.createTextOutput(resultTransfersAdmin);

      default:
        return ContentService.createTextOutput(
          "El tipo de registro no es válido"
        );
    }
  } catch (error) {
    return ContentService.createTextOutput(
      "Ha ocurrido un error: " + error.message
    );
  }
};
