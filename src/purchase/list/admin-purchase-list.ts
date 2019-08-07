import {inject} from 'aurelia-framework';
import {Purchase, PurchaseService} from "../purchase-service";
import {Error} from "../../error/Error";
import {PictureService} from "../../image/picture-service";

@inject(PurchaseService, PictureService)
export class AdminPurchaseList {

  private static readonly PAGE_SIZE = 10;

  private working : boolean;
  private downloading: boolean = false;
  private purchases : Purchase[];
  private selectedPurchase : Purchase = null;
  private error : Error;
  private hasPrevious : boolean = false;
  private hasMore : boolean = false;
  private currentPage : number;
  private statusFilter : string;

  constructor(private readonly service: PurchaseService, private readonly pictureService: PictureService){
  }

  created() {
    this.updatePurchaseList(0, AdminPurchaseList.PAGE_SIZE);
  }

  private updatePurchaseList(page : number, size : number, status : string = null) : void {
    if(status == "-") {
      status = null;
    }
    this.working = true;
    this.service.getByStatus(page, size, status).then(success => {
      this.purchases = success.entity == null ? [] : success.entity;
      this.currentPage = success.page.pageNumber;
      this.hasPrevious = success.page.pageNumber > 0;
      this.hasMore = success.page.pageNumber < success.page.totalPages - 1;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    }).then(() => {
      this.working = false;
    }, () => {
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

  private download() {
    this.downloading = true;
    this.pictureService.getFullSizeImageUrl(this.selectedPurchase.userPicture.picture.key).then(success => {
      let win = window.open(success, '_blank');
      win.focus();
    }, failure => {
      console.log(failure)
    }).then(
      () => this.downloading = false,
      () => this.downloading = false)
  }

  private deselect() {
    this.selectedPurchase = null;
  }

  private purchaseStatusChanged(purchase, event : Event) {
    let select = event.srcElement as HTMLSelectElement;
    event.srcElement.setAttribute("disabled", null);
    this.service.patch(purchase).then(success => {
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    }).then(() => {
      event.srcElement.removeAttribute("disabled");
    }, () => {
      event.srcElement.removeAttribute("disabled");
    })
  }

  private statusFilterChanged(statusFilter : string) {
    this.currentPage = 0;
    this.updatePurchaseList(this.currentPage, AdminPurchaseList.PAGE_SIZE, statusFilter);
  }

}