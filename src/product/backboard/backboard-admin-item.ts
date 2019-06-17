import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {Backboard, BackboardService} from "./backboard-service";
import {Error} from "../../error/Error";

@inject(BackboardService)
export class BackboardAdminItem {

  @bindable
  private backboard: Backboard;
  @bindable
  private backboards: Backboard[];
  private working: boolean;
  private error: Error;

  constructor(private readonly backboardService: BackboardService) {

  }

  delete() {
    this.working = true;
    this.backboardService.remove(this.backboard.id).then(success => {
      this.working = false;
      let index = this.backboards.indexOf(this.backboard, 0);
      if (index > -1) {
        this.backboards.splice(index, 1);
      }
    }, failure => {
      console.error(failure);
      this.working = false;
      this.error = new Error("Ups!", 'Parece que el sistema no response, por favor intenta nuevamente mas tarde.');
    });
  }

}