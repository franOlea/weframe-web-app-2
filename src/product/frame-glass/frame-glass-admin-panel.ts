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
    this.matTypeService.post(frameGlass).then(success => {
      this.formWorking = false;
      this.formSuccess = true;
      this.downloadList();
      window.setTimeout(() => {
        this.clearForm();
      }, 800);
    }, failure => {
      this.formWorking = false;
      this.formError = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

  downloadList(page: number = 0, size: number = 10) {
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