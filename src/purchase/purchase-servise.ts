import {inject} from 'aurelia-framework';
import {UserPicture} from "../image/user-picture";
import {Frame, FrameParser} from "../product/frame/frame-service";
import {Backboard, BackboardParser} from "../product/backboard/backboard-service";
import {MatType, MatTypeParser} from "../product/mat-type/mat-type-service";
import {HttpService} from "../api/http/http-service";
import {DeleteAbleApiService} from "../api/delete-able-api-service";
import {ApiParser} from "../api/api-service";
import {UserPictureParser} from "../image/user-picture-service";

@inject(FrameParser, BackboardParser, MatTypeParser, UserPictureParser)
export class PurchaseParser implements ApiParser<Purchase> {

  constructor(private readonly frameParser: FrameParser,
              private readonly backboardParser: BackboardParser,
              private readonly matTypeParser: MatTypeParser,
              private readonly userPictureParser: UserPictureParser) {
  }

  parseOne(object: any): Purchase {
    return null;
  }

  parseArray(array: any): Purchase[] {
    return null;
  }
}

@inject(HttpService, PurchaseParser)
export class PurchaseServise extends DeleteAbleApiService<Purchase> {

  constructor(httpService: HttpService, purchaseParser: PurchaseParser) {
    super(httpService, '/purchases', 3000, purchaseParser)
  }



}

export class Purchase {
  userPicture: UserPicture;
  frame: Frame;
  framePrice: number;
  backboard: Backboard;
  backboardPrice: number;
  frontMat: MatType;
  frontMatPrice: number;
}