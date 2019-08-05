import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Frame} from "../product/frame/frame-service";
import {Backboard} from "../product/backboard/backboard-service";
import {MatType} from "../product/mat-type/mat-type-service";
import {UserPicture} from "../image/user-picture";
import {Purchase, PurchaseService} from "../purchase/purchase-service";

@inject(EventAggregator, PurchaseService)
export class TransactionSummary {

  private userPicture : UserPicture;
  private frame : Frame;
  private backboard : Backboard;
  private frontMat : MatType;
  private streetAddressOne : string;
  private streetAddressTwo : string;
  private zipCode : string;
  private province : string;
  private locality : string;
  private loading : boolean = false;

  constructor(private readonly listener: EventAggregator,
              private readonly purchaseService: PurchaseService) {}

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
    return (m2Price * (frame.height / 100) * (frame.length / 100));
  }

  private start() {
    if(!this.loading) {
      this.loading = true;
      let purchase = Purchase.create(
        this.userPicture,
        this.frame,
        this.frame.price,
        this.backboard,
        this.calculatedPrice(this.frame, this.backboard.m2Price),
        this.frontMat,
        this.calculatedPrice(this.frame, this.frontMat.m2Price),
        this.streetAddressOne,
        this.streetAddressTwo,
        this.zipCode,
        this.province,
        this.locality
      );
      this.purchaseService.post(purchase).then(success => {
        window.location.href = success.transactionInitialPoint;
      }, failure => {
        console.log(failure);
      }).then(event => this.loading = false);
    }
  }
}