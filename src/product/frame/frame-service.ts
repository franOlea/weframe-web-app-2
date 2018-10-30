import {inject} from 'aurelia-framework';
import {DeleteAbleApiService} from '../../api/delete-able-api-service';
import {HttpService} from "../../api/http/http-service";
import {Product} from "../product";
import {Picture} from "../picture";

@inject(HttpService)
export class FrameService extends DeleteAbleApiService<Frame> {

  constructor(httpService: HttpService) {
      super(httpService, '/frames', 3000);
  }

  parseOne(object): Frame {
    let id = object.id;
    let name = object.name;
    let description = object.description;
    let height = object.height;
    let length = object.length;
    let pictureName = object.picture.name;
    let pictureKey = object.picture.key;
    let pictureUrl = object.picture.url;
    let picture = new Picture(pictureName, pictureKey, pictureUrl);
    let price = object.price;
    return new Frame(id, name, description, height, length, picture, price);
  }

  parseArray(array: {_embedded: {frames: object[]}}): Frame[] {
    return array._embedded.frames.map(object => this.parseOne(object));
  }
}

export class Frame extends Product {
  height: number;
  length: number;
  picture: Picture;
  price: number;

  constructor(id: string, name: string, description: string, height: number, length: number, picture: Picture, price: number) {
    super(id, name, description);
    this.height = height;
    this.length = length;
    this.picture = picture;
    this.price = price;
  }
}
