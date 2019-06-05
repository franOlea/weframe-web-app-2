import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";
import {UserPicture} from "./user-picture";

@inject(UserPictureService)
export class UserPictureThumbnail {

  @bindable
  private userPictures : UserPicture[];
  @bindable
  private userPicture : UserPicture;
  private loading : boolean = false;

  constructor(private readonly userPictureService : UserPictureService){}

  delete() {
    if(this.userPicture != null && !this.loading) {
      this.loading = true;
      this.userPictureService.delete(this.userPicture.id).then(success => {
        console.log("deleted");
        let index = this.userPictures.indexOf(this.userPicture, 0);
        if (index > -1) {
          this.userPictures.splice(index, 1);
        }
      }, failure => {
        console.log(failure)
      }).then(
        () => this.loading = false,
        () => this.loading = false);
    }

  }

}