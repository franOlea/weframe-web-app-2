import {inject} from 'aurelia-framework';
import {MatType, MatTypeService} from "../mat-type-service";
import {Error} from "../../../error/Error";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(MatTypeService, EventAggregator)
export class MatTypeSelector {

  private working : boolean;
  // noinspection JSMismatchedCollectionQueryUpdate
  private matTypes : MatType[];
  private error : Error;

  constructor(private service : MatTypeService, private eventAggregator: EventAggregator) {}

  created() {
    this.updateFrameList();
  }

  private updateFrameList(page : number = 0, size : number = 10) : void {
    this.working = true;
    this.service.get(page, size).then(success => {
      this.matTypes = success.entity;
      this.working = false;
    }, failure => {
      this.error = new Error('Ups', 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
      this.working = false;
    });
  }

  private select(matType: MatType) {
    console.log(matType);
    this.eventAggregator.publish(matType);
  }

}
