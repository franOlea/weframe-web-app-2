import {inject} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";
import {UserPicture} from "./user-picture";

@inject(UserPictureService)
export class UserPictureGallery {
  private userPictures : UserPicture[];

  constructor(private readonly userPictureService : UserPictureService){}

  download() {
    this.userPictureService.get(0, 10).then(success => {
      this.userPictures = success.entity;
    }, failure => {
      console.error(failure);
    });
  }
}