import {inject} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";

@inject(UserPictureService)
export class ImageUploadForm {

  private selectedFiles : File[];

  constructor(private readonly userPictureService: UserPictureService){}

  upload() {
    this.userPictureService.upload(this.selectedFiles[0]).then(success => {
      console.log("success");
      console.log(success);
    }, failure => {
      console.log(failure);
    });
  }

}