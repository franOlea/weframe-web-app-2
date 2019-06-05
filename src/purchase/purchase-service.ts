import {inject} from 'aurelia-framework';
import {UserPicture} from "../image/user-picture";
import {Frame, FrameParser} from "../product/frame/frame-service";
import {Backboard, BackboardParser} from "../product/backboard/backboard-service";
import {MatType, MatTypeParser} from "../product/mat-type/mat-type-service";
import {HttpService} from "../api/http/http-service";
import {DeleteAbleApiService} from "../api/delete-able-api-service";
import {ApiParser, Entity} from "../api/api-service";
import {UserPictureParser} from "../image/user-picture-service";
import {PagedResponseEntity} from "../api/response/response-entity";

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
      object.transactionInitialPoint,
      object.stampDatetime,
      object.status,
      object.transactionStatus,
      object.streetAddressOne,
      object.streetAddressTwo,
      object.zipCode,
      object.province,
      object.locality,
      object.user
    );
  }

  parseArray(array: {_embedded: {purchases: object[]}}): Purchase[] {
    if(array._embedded && array._embedded.purchases) {
      return array._embedded.purchases
        .map(object => this.parseOne(object));
    } else {
      return [];
    }
  }
}

@inject(HttpService, PurchaseParser)
export class PurchaseService extends DeleteAbleApiService<Purchase> {

  constructor(httpService: HttpService, purchaseParser: PurchaseParser) {
    super(httpService, '/purchases', 20000, purchaseParser)
  }

  getByStatus(page: number = 0, size: number = 10, status: string) : Promise<PagedResponseEntity<Purchase[]>> {
    return new Promise((resolve, reject) => {
      this.httpService.request(`${this.entityPath}/admin`)
        .asGet()
        .withTimeout(this.timeout)
        .withParams({page: page, size: size, status: status})
        .send()
        .then(success => {
          if (success.statusCode == 200) {
            let response = JSON.parse(success.response);
            let entities = this.parser.parseArray(response);
            let page = this.parsePage(response);
            resolve(new PagedResponseEntity(page, entities));
          } else {
            console.error(success);
            reject(success);
          }
        }, failure => {
          console.error(failure);
          reject(failure);
        });
    });
  }

}

export class Purchase extends Entity {
  userPicture: UserPicture;
  frame: Frame;
  framePrice: number;
  backboard: Backboard;
  backboardPrice: number;
  frontMat: MatType;
  frontMatPrice: number;
  transactionId: string;
  transactionInitialPoint: string;
  stampDatetime: number;
  status: PurchaseStatus;
  transactionStatus: string;
  streetAddressOne: string;
  streetAddressTwo: string;
  zipCode: string;
  province: string;
  locality: string;
  user: string;

  constructor(id: number, userPicture: UserPicture, frame: Frame, framePrice: number,
              backboard: Backboard, backboardPrice: number, frontMat: MatType,
              frontMatPrice: number, transactionId: string,
              transactionInitialPoint: string, stampDatetime: number,
              status: string, transactionStatus: string,
              streetAddressOne: string, streetAddressTwo: string, zipCode: string,
              province: string, locality: string, user: string) {
    super(id);
    this.userPicture = userPicture;
    this.frame = frame;
    this.framePrice = framePrice;
    this.backboard = backboard;
    this.backboardPrice = backboardPrice;
    this.frontMat = frontMat;
    this.frontMatPrice = frontMatPrice;
    this.transactionId = transactionId;
    this.transactionInitialPoint = transactionInitialPoint;
    this.stampDatetime = stampDatetime;
    this.status = PurchaseStatus[<string> status];
    this.transactionStatus = transactionStatus;
    this.streetAddressOne = streetAddressOne;
    this.streetAddressTwo = streetAddressTwo;
    this.zipCode = zipCode;
    this.province = province;
    this.locality = locality;
    this.user = user;
  }

  static create(userPicture: UserPicture, frame: Frame, framePrice: number,
                backboard: Backboard, backboardPrice: number, frontMat: MatType,
                frontMatPrice: number, streetAddressOne: string,
                streetAddressTwo: string, zipCode: string,
                province: string, locality: string) {
    return new Purchase(
      null,
      userPicture,
      frame,
      framePrice,
      backboard,
      backboardPrice,
      frontMat,
      frontMatPrice,
      null,
      null,
      null,
      null,
      null,
      streetAddressOne,
      streetAddressTwo,
      zipCode,
      province,
      locality,
      null
    );
  }
}

export enum PurchaseStatus {
  PENDING = "PENDING",
  MAKING = "MAKING",
  SHIPPING = "SHIPPING",
  COMPLETE = "COMPLETE",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  ERROR = "ERROR"
}