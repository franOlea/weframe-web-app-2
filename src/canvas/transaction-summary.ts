import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Frame} from "../product/frame/frame-service";
import {Backboard} from "../product/backboard/backboard-service";
import {MatType} from "../product/mat-type/mat-type-service";
import {UserPicture} from "../image/user-picture";

@inject(EventAggregator)
export class TransactionSummary {

  private userPicture : UserPicture;
  private frame : Frame;
  private backboard : Backboard;
  private frontMat : MatType;

  constructor(private readonly listener: EventAggregator) {}

  created() {
    this.listener.subscribe("picture-product-selected", (userPicture : UserPicture) => {
      this.userPicture = userPicture;
    });
    this.listener.subscribe("frame-product-selected", (frame : Frame) => {
      this.frame = frame;
    });
    this.listener.subscribe("backboard-product-selected", (backboard : Backboard) => {
      this.backboard = backboard;
    });
    this.listener.subscribe("front-mat-product-selected", (frontMat : MatType) => {
      this.frontMat = frontMat;
    });
  }

  private calculatedPrice(frame : Frame, m2Price : number) : number {
    return (m2Price * (frame.height / 1000) * (frame.length / 1000));
  }
}