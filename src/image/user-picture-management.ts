import {inject} from 'aurelia-framework';
import {UserPictureService} from "./user-picture-service";
import {UserPicture} from "./user-picture";
import {Error} from "../error/Error";

@inject(UserPictureService)
export class UserPictureManagement {

  private formFiles : File[];
  private formFile : File;
  private formLoading : boolean = false;
  private formSuccess : boolean = false;
  private formProgress : number = 0;
  private formUploadSize : number = 1;
  private formProgressPercentage : number = 0;
  private formError: Error = null;

  private userPictures : UserPicture[];
  private galleryLoading : boolean = false;

  constructor(private readonly userPictureService: UserPictureService){}

  created() {
    this.download();
  }

  download() {
    if(!this.galleryLoading) {
      this.galleryLoading = true;
      this.userPictureService.get(0, 20).then(success => {
        this.userPictures = success.entity;
      }, failure => {
        console.error(failure);
      }).then(
        () => this.galleryLoading = false,
        () => this.galleryLoading = false);
    }
  }

  upload() {
    if(!this.formLoading) {
      this.formError = null;
      this.formSuccess = false;
      this.formLoading = true;
      let file = this.formFiles[0];
      let progressCallback = (progressEvent: ProgressEvent) => {
        this.formUploadSize = progressEvent.total;
        this.formProgress = progressEvent.loaded;
        this.formProgressPercentage = Math.round((this.formProgress - this.formUploadSize) / this.formUploadSize * 100) + 100;
        console.log(this.formProgressPercentage +" "+ this.formProgress + " " + this.formUploadSize);
      };
      this.userPictureService.upload(file, progressCallback).then(success => {
        this.formSuccess = true;
        this.download();
        this.clearForm();
        console.log(success);
      }, failure => {
        if(failure.statusCode == 409) {
          this.formError = new Error("Máxima cantidad de imagenes alcanzada (20).", "Por favor eliminá imagenes antes de subir una nueva.");
        } else if(failure.statusCode == 413) {
          this.formError = new Error("La imagen es muy grande.", "La imagen supera el tamaño máximo permitido de 20MB.");
        } else {
          this.formError = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
        }
      }).then(
        () => this.formLoading = false,
        () => this.formLoading = false);
    }

  }

  clearForm() {
    this.formError = null;
    this.formFiles = null;
    this.formFile = null;
    this.formLoading = false;
    this.formSuccess = false;
    this.formProgress = 0;
    this.formUploadSize = 1;
    this.formProgressPercentage = 0;
  }

}