import {inject} from 'aurelia-framework';
import {Error} from "../../error/Error";
import {EventAggregator} from 'aurelia-event-aggregator';
import {FrameGlass, FrameGlassService} from "../../product/frame-glass/frame-glass-service";

@inject(FrameGlassService, EventAggregator)
export class FrameGlassSelector {

  private working : boolean;
  // noinspection JSMismatchedCollectionQueryUpdate
  private frameGlasses : FrameGlass[];
  private selectedFrameGlass : FrameGlass;
  private error : Error;

  constructor(private service : FrameGlassService, private eventAggregator : EventAggregator) {
  }

  created() {
    this.updateFrameGlassList();
  }

  private updateFrameGlassList(page : number = 0, size : number = 10) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      this.frameGlasses = success.entity;
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

  private select(frameGlass: FrameGlass) {
    this.eventAggregator.publish("frame-glass-product-selected", frameGlass);
    this.selectedFrameGlass = frameGlass;
  }

}
