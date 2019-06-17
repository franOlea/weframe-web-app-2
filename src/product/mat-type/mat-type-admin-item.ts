import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {MatType, MatTypeService} from "./mat-type-service";
import {Error} from "../../error/Error";

@inject(MatTypeService)
export class MatTypeAdminItem {

  @bindable
  private matType: MatType;
  @bindable
  private matTypes: MatType[];
  private working: boolean;
  private error: Error;

  constructor(private readonly matTypeService: MatTypeService) {

  }

  delete() {
    this.working = true;
    this.matTypeService.remove(this.matType.id).then(success => {
      this.working = false;
      let index = this.matTypes.indexOf(this.matType, 0);
      if (index > -1) {
        this.matTypes.splice(index, 1);
      }
    }, failure => {
      console.error(failure);
      this.working = false;
      this.error = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

}