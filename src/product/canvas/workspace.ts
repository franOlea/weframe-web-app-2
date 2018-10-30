import {inject} from 'aurelia-framework';
import {Frame} from "../frame/frame-service";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Backboard} from "../backboard/backboard-service";
import {MatType} from "../mat-type/mat-type-service";
import environment from '../../environment';
// import * as interact from 'interactjs';


@inject(EventAggregator)
export class Workspace {

  private displayedFrame: Frame;
  private selectedFrame: Frame;
  private displayedBackboard: Backboard;
  private selectedBackboard: Backboard;
  private displayedMatType: MatType;
  private selectedMatType: MatType;

  private selectorButton: boolean;

  constructor(private eventAggregator : EventAggregator) {}

  created() {
    let _self = this;
    this.eventAggregator.subscribe(Frame, frame  => {
      console.log("New frame selected: " + frame.name);
      _self.displayedFrame = frame;
    });
    this.eventAggregator.subscribe(Backboard, backboard => {
      console.log("New backboard selected: " + backboard.name);
      _self.displayedBackboard = backboard;
    });
    this.eventAggregator.subscribe(MatType, matType => {
      console.log("New mat type selected: " + matType.name);
      _self.displayedMatType = matType;
    });
    this.eventAggregator.subscribe(environment.canvasSelectorChangeEvent, this.selectorChangeEventHandler);
  }

  private selectProduct() {
    if(this.displayedFrame != null) {
      this.selectedFrame = this.displayedFrame;
    } else if(this.displayedBackboard != null) {
      this.selectedBackboard = this.displayedBackboard;
    } else if(this.displayedMatType != null) {
      this.selectedMatType = this.displayedMatType;
    }
    this.selectorButton = false;
  }

  private selectorChangeEventHandler = currentSelector => {
    console.log(currentSelector);
    switch (currentSelector) {
      case 'frames':
        this.selectorButton = this.selectedFrame == null;
        this.displayedFrame = this.selectedFrame;
        this.displayedBackboard = null;
        this.displayedMatType = null;
        break;
      case 'backboards':
        this.selectorButton = this.selectedBackboard == null;
        this.displayedBackboard = this.selectedBackboard;
        this.displayedFrame = null;
        this.displayedMatType = null;
        break;
      case 'matTypes':
        this.selectorButton = this.selectedMatType == null;
        this.displayedMatType = this.selectedMatType;
        this.displayedFrame = null;
        this.displayedBackboard = null;
        break;
      default:
        this.displayedFrame = null;
        this.displayedBackboard = null;
        this.displayedMatType = null;
        break;
    }
  };

}
