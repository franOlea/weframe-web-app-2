import {bindable} from 'aurelia-framework';

export class FrameThumbnail {

  @bindable
  private frame;
  private hasLoaded : boolean = false;

  constructor() {
  }

  created() {
  }

  setHasLoaded() {
    this.hasLoaded = true;
  }
}
