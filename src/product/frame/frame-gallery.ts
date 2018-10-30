import { inject } from 'aurelia-framework';
import {Frame, FrameService} from './frame-service';

@inject(FrameService)
export class FrameGallery {

  private rowSize = 6;
  private frames: Frame[] = [];
  private error = {title: null, description: null};
  private working = false;

  constructor(private frameService: FrameService) {}

  created() {
    this.retrieveFrames();
  }

  retrieveFrames(page: number = 1, size: number = 10) {
    this.working = true;
    this.frameService.get(page, size).then(success => {
      // var frameRows = Math.ceil(this.frames.length / this.rowSize);
      this.frames = success.entity;
      this.frames.forEach((frame) => {
        console.log(frame);
      }, this);
      this.working = false;
    }, failure => {
        this.error.title = 'Ups';
        this.error.description = 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.';
        this.working = false;
    });
  }

}
