import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Workspace {

  private imageUrl: string;

  constructor(private readonly eventAggregator: EventAggregator) {
    let _self = this;
    this.eventAggregator.subscribe("product-selected-event", url  => {
      _self.imageUrl = url;
    });
  }

}