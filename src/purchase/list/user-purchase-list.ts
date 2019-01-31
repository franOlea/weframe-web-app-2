import {inject} from 'aurelia-framework';
import {Purchase, PurchaseService} from "../purchase-service";
import {Error} from "../../error/Error";
import {Frame} from "../../product/frame/frame-service";

@inject(PurchaseService)
export class UserPurchaseList {

  private working : boolean;
  private purchases : Purchase[];
  private selectedPurchase : Purchase = null;
  private error : Error;

  constructor(private readonly service: PurchaseService){
  }

  created() {
    this.updatePurchaseList();
  }

  private updatePurchaseList(page : number = 0, size : number = 10) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      this.purchases = success.entity;
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

  private select(purchase : Purchase) {
    this.selectedPurchase = purchase;
  }

  private deselect() {
    this.selectedPurchase = null;
  }

}