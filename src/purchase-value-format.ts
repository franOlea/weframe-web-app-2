import * as numeral from "numeral";
import {Frame} from "./product/frame/frame-service";

export class PurchaseValueFormatValueConverter {

  toView(purchase) {
    let price = purchase.frame.price
      + PurchaseValueFormatValueConverter.calculatedPrice(purchase.frame, purchase.backboard.m2Price)
        + PurchaseValueFormatValueConverter.calculatedPrice(purchase.frame, purchase.frontMat.m2Price);
    return numeral(price.toFixed(2)).format("($0,0.00)");
  }

  private static calculatedPrice(frame : Frame, m2Price : number) : number {
    return (m2Price * (frame.height / 1000) * (frame.length / 1000));
  }

}
