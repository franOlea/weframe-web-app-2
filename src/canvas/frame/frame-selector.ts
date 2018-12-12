import {inject} from 'aurelia-framework';
import {Frame, FrameService} from "../../product/frame/frame-service";
import {Error} from "../../error/Error";
import {EventAggregator} from 'aurelia-event-aggregator';
import {CanvasProductManager} from "../canvas-product-manager";

@inject(FrameService, EventAggregator, CanvasProductManager)
export class FrameSelector {

  private working : boolean;
  // noinspection JSMismatchedCollectionQueryUpdate
  private frames : Frame[];
  private selectedFrame : Frame;
  private selected : boolean = false;
  private error : Error;

  constructor(private service : FrameService, private eventAggregator : EventAggregator, private manager : CanvasProductManager) {
    // this.eventAggregator.subscribe("current-selector-change", selector => {
    //   if(selector == "frame/frame-selector") {
    //     this.selectedFrame = this.manager.selectedFrame;
    //   }
    // });
  }

  created() {
    this.updateFrameList();
  }

  private updateFrameList(page : number = 0, size : number = 10) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      this.frames = success.entity;
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

  private select(frame: Frame) {
    this.eventAggregator.publish("product-selected", frame.picture.url);
    this.eventAggregator.publish("frame-product-selected", frame);
    this.selectedFrame = frame;
    this.manager.selectedFrame = frame;
  }

}
