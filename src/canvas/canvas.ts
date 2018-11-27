import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Canvas {

  private currentSelector = "frame/frame-selector";

  constructor(private readonly eventAggregator: EventAggregator) { }

  changeSelector(selector: string) {
    this.currentSelector = selector;
    this.eventAggregator.publish("current-selector-change", selector);
  }

}