import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {FrameGlass, FrameGlassService} from "./frame-glass-service";
import {Error} from "../../error/Error";

@inject(FrameGlassService)
export class FrameGlassAdminItem {

  @bindable
  private frameGlass: FrameGlass;
  @bindable
  private frameGlasses: FrameGlass[];
  private working: boolean;
  private error: Error;

  constructor(private readonly frameGlassService: FrameGlassService) {

  }

  delete() {
    this.working = true;
    this.frameGlassService.remove(this.frameGlass.id).then(success => {
      this.working = false;
      let index = this.frameGlasses.indexOf(this.frameGlass, 0);
      if (index > -1) {
        this.frameGlasses.splice(index, 1);
      }
    }, failure => {
      console.error(failure);
      this.working = false;
      this.error = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

}