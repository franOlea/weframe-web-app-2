import {inject} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";

@inject(UserPictureService)
export class ImageUploadForm {

  private selectedFiles : File[];
  private loading : boolean = false;
  private success : boolean = false;
  private progress : number = 0;
  private uploadSize : number = 1;
  private progressPercentage : number = 0;
  private uploadedFiles : File[];

  constructor(private readonly userPictureService: UserPictureService){}

  upload() {
    if(!this.loading) {
      this.success = false;
      this.loading = true;
      let progressCallback = (progressEvent: ProgressEvent) => {
        this.uploadSize = progressEvent.total;
        this.progress = progressEvent.loaded;
        this.progressPercentage = Math.round((this.progress - this.uploadSize) / this.uploadSize * 100) + 100;
        console.log(this.progressPercentage +" "+ this.progress + " " + this.uploadSize);
      };
      this.userPictureService.upload(this.selectedFiles[0], progressCallback).then(success => {
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