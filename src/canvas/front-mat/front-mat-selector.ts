import {inject} from 'aurelia-framework';
import {Error} from "../../error/Error";
import {EventAggregator} from 'aurelia-event-aggregator';
import {MatType, MatTypeService} from "../../product/mat-type/mat-type-service";

@inject(MatTypeService, EventAggregator)
export class FrontMatSelector {

  private working : boolean;
  // noinspection JSMismatchedCollectionQueryUpdate
  private matTypes : MatType[];
  private selectedMatType : MatType;
  private error : Error;

  constructor(private service : MatTypeService, private eventAggregator : EventAggregator) {
  }

  created() {
    this.updateMatTypeList();
  }

  private updateMatTypeList(page : number = 0, size : number = 20) : void {
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
    this.eventAggregator.publish("product-selected", matType.picture.url);
    this.eventAggregator.publish("front-mat-product-selected", matType);
    this.selectedMatType = matType;
  }

}
