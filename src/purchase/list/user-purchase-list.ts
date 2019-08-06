import {inject} from 'aurelia-framework';
import {Purchase, PurchaseService} from "../purchase-service";
import {Error} from "../../error/Error";
import {PictureService} from "../../image/picture-service";

@inject(PurchaseService, PictureService)
export class UserPurchaseList {

  private static readonly PAGE_SIZE = 20;

  private working : boolean;
  private downloading : boolean = false;
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
    this.updatePurchaseList();
  }

  private updatePurchaseList(page : number = 0, size : number = UserPurchaseList.PAGE_SIZE) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
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
    this.updatePurchaseList(++this.currentPage, UserPurchaseList.PAGE_SIZE);
  }

  private loadPrevious() {
    this.updatePurchaseList(--this.currentPage, UserPurchaseList.PAGE_SIZE);
  }

  private select(purchase : Purchase) {
    this.selectedPurchase = purchase;
  }

  private deselect() {
    this.selectedPurchase = null;
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

}