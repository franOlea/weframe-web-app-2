import {Frame} from "../product/frame/frame-service";
import {Backboard} from "../product/backboard/backboard-service";

export class CanvasProductManager {
  selectedFrame : Frame;
  selectedBackboard : Backboard;

  reset() {
    this.selectedFrame = null;
    this.selectedBackboard = null;
  }
}