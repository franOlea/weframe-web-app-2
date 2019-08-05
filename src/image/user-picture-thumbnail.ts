import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";
import {UserPicture} from "./user-picture";
import {PictureService} from "./picture-service";

@inject(UserPictureService, PictureService)
export class UserPictureThumbnail {

  @bindable
  private userPictures : UserPicture[];
  @bindable
  private userPicture : UserPicture;
  private deleting : boolean = false;
  private downloading : boolean = false;

  constructor(private readonly userPictureService : UserPictureService, private readonly pictureService: PictureService){}

  delete() {
    if(this.userPicture != null && !this.deleting) {
      this.deleting = true;
      this.userPictureService.delete(this.userPicture.id).then(success => {
        console.log("deleted");
        let index = this.userPictures.indexOf(this.userPicture, 0);
        if (index > -1) {
          this.userPictures.splice(index, 1);
        }
      }, failure => {
        console.log(failure)
      }).then(
        () => this.deleting = false,
        () => this.deleting = false);
    }
  }

  download() {
    if(this.userPicture != null && !this.downloading) {
      this.downloading = true;
      this.pictureService.getFullSizeImageUrl(this.userPicture.picture.key).then(success => {
          let win = window.open(success, '_blank');
          win.focus();
        }, failure => {
          console.log(failure)
        }).then(
        () => this.downloading = false,
        () => this.downloading = false);
    }
  }

}