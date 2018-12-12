import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Workspace {

  private imageUrl: string;
  private visualizedProduct: any;
  private selectedProduct: any;
  private currentProductSelectable: boolean = false;

  constructor(private readonly eventAggregator: EventAggregator) {
    let _self = this;
    this.eventAggregator.subscribe("product-selected", url  => {
      _self.imageUrl = url;
    });
    this.eventAggregator.subscribe("current-selector-change", selector => {

    });
    this.eventAggregator.subscribe("frame-product-selected", frame => {
      this.setVisualized(frame);
    });
    this.eventAggregator.subscribe("backboard-product-selected", backboard => {
      this.setVisualized(backboard);
    });
    this.eventAggregator.subscribe("picture-product-selected", userPicture => {
      this.setVisualized(userPicture);
    });
  }

  setVisualized(visualizedProduct : any) {
    this.visualizedProduct = visualizedProduct;
    this.setCurrentProductIsSelectable();
  }

  select() {
    this.selectedProduct = this.visualizedProduct;
    this.setCurrentProductIsSelectable();
    this.eventAggregator.publish("product-chosen", this.selectedProduct);
  }

  private setCurrentProductIsSelectable() {
    this.currentProductSelectable = this.visualizedProduct != this.selectedProduct;
  }

}