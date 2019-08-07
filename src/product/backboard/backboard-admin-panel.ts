import {inject} from 'aurelia-framework';
import {Backboard, BackboardService} from "./backboard-service";
import {Error} from "../../error/Error";
import {PictureService} from "../../image/picture-service";

@inject(BackboardService, PictureService)
export class BackboardAdminPanel {

  private formError: Error;
  private formWorking: boolean = false;
  private formSuccess: boolean = false;
  private formFiles: File[];
  private formFile;
  private formName: string;
  private formDescription: string;
  private formPrice: number;

  private formProgress : number = 0;
  private formUploadSize : number = 1;
  private formProgressPercentage : number = 0;

  private listError: Error;
  private listWorking: boolean = false;
  private backboards: Backboard[];

  constructor(private readonly backboardService: BackboardService,
              private readonly pictureService: PictureService) {

  }

  created() {
    this.downloadList();
  }

  clearForm() {
    this.formPrice = null;
    this.formFiles = null;
    this.formFile = null;
    this.formDescription = null;
    this.formName = null;
    this.formSuccess = false;
  }

  uploadForm() {
    if(!this.formFiles || !this.formName || !this.formDescription || !this.formPrice) {
      this.formError = new Error("Error,", 'debe completar todos los datos del formulario para poder subir.');
      return;
    }
    this.formWorking = true;
    this.formError = null;
    let file = this.formFiles[0];
    const _self = this;
    let progressCallback = (progressEvent: ProgressEvent) => {
      this.formUploadSize = progressEvent.total;
      this.formProgress = progressEvent.loaded;
      this.formProgressPercentage = Math.round((this.formProgress - this.formUploadSize) / this.formUploadSize * 100) + 100;
    };
    this.pictureService.upload(file, progressCallback).then(picture => {
      let backboard = new Backboard(null, this.formName, this.formDescription, picture, this.formPrice);
      _self.backboardService.post(backboard).then(success => {
        _self.formWorking = false;
        _self.formSuccess = true;
        _self.formProgress = 0;
        _self.formUploadSize = 1;
        _self.formProgressPercentage = 0;
        _self.downloadList();
        window.setTimeout(() => {
          this.clearForm();
        }, 800);
      }, failure => {
        _self.formWorking = false;
        _self.formError = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      });
    });
  }

  downloadList(page: number = 0, size: number = 20) {
    this.listWorking = true;
    this.backboardService.get(page, size).then(backboardsPage => {
      this.listWorking = false;
      this.backboards = backboardsPage.entity;
    }, failure => {
      this.listWorking = false;
      this.listError = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

}