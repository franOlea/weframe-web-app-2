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
  private statusFilter : string;

  constructor(private readonly service: PurchaseService){
  }

  created() {
    this.updatePurchaseList(0, AdminPurchaseList.PAGE_SIZE);
  }

  private updatePurchaseList(page : number, size : number, status : string = null) : void {
    this.working = true;
    this.service.getByStatus(page, size, status).then(success => {
      console.log(success);
      this.purchases = success.entity == null ? [] : success.entity;
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
    this.updatePurchaseList(++this.currentPage, AdminPurchaseList.PAGE_SIZE, this.statusFilter);
  }

  private loadPrevious() {
    this.updatePurchaseList(--this.currentPage, AdminPurchaseList.PAGE_SIZE, this.statusFilter);
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

  private statusFilterChanged(statusFilter : string) {
    this.currentPage = 0;
    this.updatePurchaseList(this.currentPage, AdminPurchaseList.PAGE_SIZE, statusFilter);
  }

}