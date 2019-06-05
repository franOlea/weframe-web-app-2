import {inject} from 'aurelia-framework';
import {DeleteAbleApiService} from '../../api/delete-able-api-service';
import {HttpService} from "../../api/http/http-service";
import {Product} from "../product";
import {Picture} from "../picture";
import {ApiParser} from "../../api/api-service";

export class MatTypeParser implements ApiParser<MatType> {

  parseOne(object): MatType {
    let id = object.id;
    let name = object.name;
    let description = object.description;
    let pictureId = object.picture.id;
    let pictureName = object.picture.name;
    let pictureKey = object.picture.key;
    let pictureUrl = object.picture.url;
    let picture = new Picture(pictureId, pictureName, pictureKey, pictureUrl);
    let m2Price = object.m2Price;
    return new MatType(id, name, description, picture, m2Price);
  }

  parseArray(array: {_embedded: {"mat-types": object[]}}): MatType[] {
    if(array._embedded && array._embedded["mat-types"]) {
      return array._embedded["mat-types"]
        .map(object => this.parseOne(object));
    } else {
      return [];
    }
  }

}

@inject(HttpService, MatTypeParser)
export class MatTypeService extends DeleteAbleApiService<MatType> {

  constructor(httpService: HttpService, matTypeParser: MatTypeParser) {
    super(httpService, '/mat-types', 10000, matTypeParser);
  }

}

export class MatType extends Product {
  picture: Picture;
  m2Price: number;

  constructor(id: number, name: string, description: string, picture: Picture, m2Price: number) {
    super(id, name, description);
    this.picture = picture;
    this.m2Price = m2Price;
  }
}
