import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {Frame, FrameService} from "./frame-service";
import {Error} from "../../error/Error";

@inject(FrameService)
export class FrameAdminItem {

  @bindable
  private frame: Frame;
  @bindable
  private frames: Frame[];
  private working: boolean;
  private error: Error;

  constructor(private readonly frameService: FrameService) {

  }

  delete() {
    this.working = true;
    this.frameService.remove(this.frame.id).then(success => {
      this.working = false;
      let index = this.frames.indexOf(this.frame, 0);
      if (index > -1) {
        this.frames.splice(index, 1);
      }
    }, failure => {
      console.error(failure);
      this.working = false;
      this.error = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

}