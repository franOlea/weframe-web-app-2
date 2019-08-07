import {inject} from 'aurelia-framework';
import {FrameGlass, FrameGlassService} from "./frame-glass-service";
import {Error} from "../../error/Error";

@inject(FrameGlassService)
export class FrameGlassAdminPanel {

  private formError: Error;
  private formWorking: boolean = false;
  private formSuccess: boolean = false;
  private formName: string;
  private formDescription: string;
  private formPrice: number;

  private formProgress : number = 0;
  private formUploadSize : number = 1;
  private formProgressPercentage : number = 0;

  private listError: Error;
  private listWorking: boolean = false;
  private frameGlasses: FrameGlass[];

  constructor(private readonly matTypeService: FrameGlassService) {

  }

  created() {
    this.downloadList();
  }

  clearForm() {
    this.formPrice = null;
    this.formDescription = null;
    this.formName = null;
    this.formSuccess = false;
  }

  uploadForm() {
    if(!this.formName || !this.formDescription || !this.formPrice) {
      this.formError = new Error("Error,", 'debe completar todos los datos del formulario para poder subir.');
      return;
    }
    this.formWorking = true;
    this.formError = null;
    let frameGlass = new FrameGlass(null, this.formName, this.formDescription, this.formPrice);
    let progressCallback = (progressEvent: ProgressEvent) => {
      this.formUploadSize = progressEvent.total;
      this.formProgress = progressEvent.loaded;
      this.formProgressPercentage = Math.round((this.formProgress - this.formUploadSize) / this.formUploadSize * 100) + 100;
    };
    this.matTypeService.post(frameGlass, progressCallback).then(success => {
      this.formWorking = false;
      this.formSuccess = true;
      this.formProgress = 0;
      this.formUploadSize = 1;
      this.formProgressPercentage = 0;
      this.downloadList();
      window.setTimeout(() => {
        this.clearForm();
      }, 800);
    }, failure => {
      this.formWorking = false;
      this.formError = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

  downloadList(page: number = 0, size: number = 20) {
    this.listWorking = true;
    this.matTypeService.get(page, size).then(matTypesPage => {
      this.listWorking = false;
      this.frameGlasses = matTypesPage.entity;
    }, failure => {
      this.listWorking = false;
      this.listError = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

}