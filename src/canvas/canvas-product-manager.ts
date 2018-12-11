import {Frame} from "../product/frame/frame-service";
import {Backboard} from "../product/backboard/backboard-service";
import {UserPicture} from "../image/user-picture";

export class CanvasProductManager {
  selectedPicture : UserPicture;
  selectedFrame : Frame;
  selectedBackboard : Backboard;

  reset() {
    this.selectedPicture = null;
    this.selectedFrame = null;
    this.selectedBackboard = null;
  }
}