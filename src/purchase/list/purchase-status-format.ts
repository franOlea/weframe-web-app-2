export class PurchaseStatusFormatValueConverter {

  toView(purchaseStatus) {
    switch (purchaseStatus) {
      case ("PENDING"):
        return "Pendiente de pago";
        break;
      case ("MAKING"):
        return "En proceso";
        break;
      case ("SHIPPING"):
        return "En camino";
        break;
      case ("COMPLETE"):
        return "Entregado";
        break;
      case ("CANCELLED"):
        return "Cancelado";
        break;
      case ("REJECTED"):
        return "Rechazado";
        break;
      case ("ERROR"):
        return "Error";
        break;
      default:
        return "Error [*]";
        break;
    }
  }

  toEnum(purchaseStatus) {
    switch (purchaseStatus) {
      case ("Pendiente de pago"):
        return "PENDING";
        break;
      case ("En proceso"):
        return "MAKING";
        break;
      case ("En camino"):
        return "SHIPPING";
        break;
      case ("Entregado"):
        return "COMPLETE";
        break;
      case ("Cancelado"):
        return "CANCELLED";
        break;
      case ("Rechazado"):
        return "REJECTED";
        break;
      case ("Error"):
        return "ERROR";
        break;
      default:
        return "Error [*]";
        break;
    }
  }

}
