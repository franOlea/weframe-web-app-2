import {inject} from 'aurelia-framework';
import {Frame, FrameService} from "./frame-service";
import {Error} from "../../error/Error";

@inject(FrameService)
export class FrameList {

  private service : FrameService;

  private working : boolean;
  private frames : Frame[];
  private error : Error;

  constructor(service : FrameService) {
    this.service = service;
  }

  created() {
    this.updateFrameList();
  }

  private updateFrameList(page : number = 0, size : number = 10) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      this.frames = success.entity;
      this.frames.forEach((frame) => {
        console.log(frame);
      }, this);
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

}
