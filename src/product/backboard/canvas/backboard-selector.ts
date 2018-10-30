import {inject} from 'aurelia-framework';
import {Backboard, BackboardService} from "../backboard-service";
import {Error} from "../../../error/Error";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(BackboardService, EventAggregator)
export class BackboardSelector {

  private working : boolean;
  private backboards : Backboard[];
  private error : Error;

  constructor(private service : BackboardService, private eventAggregator: EventAggregator) {
  }

  created() {
    this.updateBackboardList();
  }

  private updateBackboardList(page : number = 0, size : number = 10) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      this.backboards = success.entity;
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

  private select(backboard: Backboard) {
    this.eventAggregator.publish(backboard)
  }

}
