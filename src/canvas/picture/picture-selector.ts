import {inject} from 'aurelia-framework';
import {Error} from "../../error/Error";
import {EventAggregator} from 'aurelia-event-aggregator';
import {CanvasProductManager} from "../canvas-product-manager";
import {UserPictureService} from "../../image/user-picture-service";
import {UserPicture} from "../../image/user-picture";

@inject(UserPictureService, EventAggregator, CanvasProductManager)
export class PictureSelector {

  private working : boolean;
  // noinspection JSMismatchedCollectionQueryUpdate
  private userPictures : UserPicture[];
  private selectedPicture : UserPicture;
  private error : Error;

  constructor(private service : UserPictureService, private eventAggregator : EventAggregator, private manager : CanvasProductManager) {
    // this.eventAggregator.subscribe("current-selector-change", selector => {
    //   if(selector == "picture/picture-selector") {
    //     this.selectedPicture = this.manager.selectedPicture;
    //   }
    // });
  }

  created() {
    this.updateUserPictureList();
  }

  private updateUserPictureList(page : number = 0, size : number = 10) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      this.userPictures = success.entity;
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

  private select(picture: UserPicture) {
    this.eventAggregator.publish("product-selected", picture.picture.url);
    this.eventAggregator.publish("picture-product-selected", picture);
    this.selectedPicture = picture;
    this.manager.selectedPicture = picture;
  }

}
