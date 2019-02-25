import {inject} from 'aurelia-framework';
import {Purchase, PurchaseService} from "../purchase-service";
import {Error} from "../../error/Error";

@inject(PurchaseService)
export class AdminPurchaseList {

  private static readonly PAGE_SIZE = 1;

  private working : boolean;
  private purchases : Purchase[];
  private selectedPurchase : Purchase = null;
  private error : Error;
  private hasPrevious : boolean = false;
  private hasMore : boolean = false;
  private currentPage : number;

  constructor(private readonly service: PurchaseService){
  }

  created() {
    this.updatePurchaseList(0, AdminPurchaseList.PAGE_SIZE);
  }

  private updatePurchaseList(page : number = 0, size : number = AdminPurchaseList.PAGE_SIZE) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      console.log(success);
      this.purchases = success.entity;
      this.currentPage = success.page.pageNumber;
      this.hasPrevious = success.page.pageNumber > 0;
      this.hasMore = success.page.pageNumber < success.page.totalPages - 1;
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

  private loadNext() {
    this.updatePurchaseList(++this.currentPage);
  }

  private loadPrevious() {
    this.updatePurchaseList(--this.currentPage);
  }

  private select(purchase : Purchase) {
    this.selectedPurchase = purchase;
  }

  private deselect() {
    this.selectedPurchase = null;
  }

  private purchaseStatusChanged(event) {
    console.log(event);
    this.service.patch(event).then(success => {
      console.log("success");
      console.log(success);
    }, failure => {
      console.log("failure");
      console.log(failure);
    })
  }

}