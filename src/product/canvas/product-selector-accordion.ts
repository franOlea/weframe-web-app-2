import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import environment from '../../environment';

@inject(EventAggregator)
export class ProductSelectorAccordion {

  constructor(private readonly eventAggregator: EventAggregator) {

  }

  changeToFrameSelector() {
    this.changeSelector('frames');
  }

  changeToBackboardSelector() {
    this.changeSelector('backboards');
  }

  changeToMatTypeSelector() {
    this.changeSelector('matTypes');
  }

  changeToFrameGlassSelector() {
    this.changeSelector('frameGlasses');
  }

  private changeSelector(selectorName: string) {
    console.log(selectorName);
    this.eventAggregator.publish(environment.canvasSelectorChangeEvent, selectorName);
  }

}
