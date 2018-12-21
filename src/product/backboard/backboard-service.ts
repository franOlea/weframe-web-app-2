import {inject} from 'aurelia-framework';
import {DeleteAbleApiService} from '../../api/delete-able-api-service';
import {HttpService} from "../../api/http/http-service";
import {Product} from "../product";
import {Picture} from "../picture";
import {ApiParser} from "../../api/api-service";

export class BackboardParser implements ApiParser<Backboard> {

  parseOne(object): Backboard {
    let id = object.id;
    let name = object.name;
    let description = object.description;
    let pictureName = object.picture.name;
    let pictureKey = object.picture.key;
    let pictureUrl = object.picture.url;
    let picture = new Picture(pictureName, pictureKey, pictureUrl);
    let m2Price = object.m2Price;
    return new Backboard(id, name, description, picture, m2Price);
  }

  parseArray(array: {_embedded: {backboards: object[]}}): Backboard[] {
    return array._embedded.backboards.map(object => this.parseOne(object));
  }

}

@inject(HttpService, BackboardParser)
export class BackboardService extends DeleteAbleApiService<Backboard> {

  constructor(httpService: HttpService, backboardParser: BackboardParser) {
    super(httpService, "/backboards", 3000, backboardParser);
  }

}

export class Backboard extends Product {
  picture: Picture;
  m2Price: number;

  constructor(id: string, name: string, description: string, picture: Picture, m2Price: number) {
    super(id, name, description);
    this.picture = picture;
    this.m2Price = m2Price;
  }
}