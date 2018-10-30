import {inject} from 'aurelia-framework';
import {DeleteAbleApiService} from '../../api/delete-able-api-service';
import {HttpService} from "../../api/http/http-service";
import {Product} from "../product";
import {Picture} from "../picture";

@inject(HttpService)
export class MatTypeService extends DeleteAbleApiService<MatType> {

  constructor(httpService: HttpService) {
    super(httpService, '/mat-types', 3000);
  }

  parseOne(object): MatType {
    let id = object.id;
    let name = object.name;
    let description = object.description;
    let pictureName = object.picture.name;
    let pictureKey = object.picture.key;
    let pictureUrl = object.picture.url;
    let picture = new Picture(pictureName, pictureKey, pictureUrl);
    let m2Price = object.m2Price;
    return new MatType(id, name, description, picture, m2Price);
  }

  parseArray(array: {_embedded: {"mat-types": object[]}}): MatType[] {
    return array._embedded["mat-types"].map(object => this.parseOne(object));
  }

}

export class MatType extends Product {
  picture: Picture;
  m2Price: number;

  constructor(id: string, name: string, description: string, picture: Picture, m2Price: number) {
    super(id, name, description);
    this.picture = picture;
    this.m2Price = m2Price;
  }
}
