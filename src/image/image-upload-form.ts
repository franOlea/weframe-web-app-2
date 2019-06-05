import {inject} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";

@inject(UserPictureService)
export class ImageUploadForm {

  private selectedFiles : File[];
  private loading : boolean = false;
  private success : boolean = false;
  private uploadedFiles : File[];

  constructor(private readonly userPictureService: UserPictureService){}

  upload() {
    if(!this.loading) {
      this.success = false;
      this.loading = true;
      this.userPictureService.upload(this.selectedFiles[0]).then(success => {
        console.log("success");
        this.uploadedFiles = this.selectedFiles;
        this.success = true;
        console.log(success);
      }, failure => {
        console.log(failure);
      }).then(
        () => this.loading = false,
        () => this.loading = false);
    }

  }

}