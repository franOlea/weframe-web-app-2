import {inject} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";
import {UserPicture} from "./user-picture";

@inject(UserPictureService)
export class UserPictureGallery {
  private userPictures : UserPicture[];
  private loading : boolean = false;

  constructor(private readonly userPictureService : UserPictureService){}

  created() {
    this.download();
  }

  download() {
    if(!this.loading) {
      this.loading = true;
      this.userPictureService.get(0, 20).then(success => {
        this.userPictures = success.entity;
      }, failure => {
        console.error(failure);
      }).then(
        () => this.loading = false,
        () => this.loading = false);
    }
  }

}