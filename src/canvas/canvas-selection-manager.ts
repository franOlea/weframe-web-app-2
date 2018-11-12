import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Frame} from "../product/frame/frame-service";
import {Backboard} from "../product/backboard/backboard-service";
import {MatType} from "../product/mat-type/mat-type-service";
import {FrameGlass} from "../product/frame-glass/frame-glass-service";

@inject(EventAggregator)
export class CanvasSelectionManager {

  private frame: Frame;
  private backboard: Backboard;
  private frontMat: MatType;
  private glass: FrameGlass;

  constructor(private readonly eventAggregator: EventAggregator) {

  }



}