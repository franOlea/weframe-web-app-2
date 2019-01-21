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
    return new Purchase(
      object.id,
      this.userPictureParser.parseOne(object.userPicture),
      this.frameParser.parseOne(object.frame),
      object.framePrice,
      this.backboardParser.parseOne(object.backboard),
      object.backboardPrice,
      this.matTypeParser.parseOne(object.frontMat),
      object.frontMatPrice,
      object.transactionId,
      object.transactionInitialPoint
    );
  }

  parseArray(array: any): Purchase[] {
    return array._embedded.purchases
      .map(object => this.parseOne(object));
  }
}

@inject(HttpService, PurchaseParser)
export class PurchaseService extends DeleteAbleApiService<Purchase> {

  constructor(httpService: HttpService, purchaseParser: PurchaseParser) {
    super(httpService, '/purchases', 3000, purchaseParser)
  }

}

export class Purchase {
  id: number;
  userPicture: UserPicture;
  frame: Frame;
  framePrice: number;
  backboard: Backboard;
  backboardPrice: number;
  frontMat: MatType;
  frontMatPrice: number;
  transactionId: string;
  transactionInitialPoint: string;

  constructor(id: number, userPicture: UserPicture, frame: Frame, framePrice: number, backboard: Backboard, backboardPrice: number, frontMat: MatType, frontMatPrice: number, transactionId: string = null, transactionInitialPoint: string = null) {
    this.id = id;
    this.userPicture = userPicture;
    this.frame = frame;
    this.framePrice = framePrice;
    this.backboard = backboard;
    this.backboardPrice = backboardPrice;
    this.frontMat = frontMat;
    this.frontMatPrice = frontMatPrice;
    this.transactionId = transactionId;
    this.transactionInitialPoint = transactionInitialPoint;
  }
}