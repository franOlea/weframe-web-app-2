import {inject} from 'aurelia-framework';
import {DeleteAbleApiService} from '../../api/delete-able-api-service';
import {HttpService} from "../../api/http/http-service";
import {Product} from "../product";

@inject(HttpService)
export class FrameGlassService extends DeleteAbleApiService<FrameGlass> {

  constructor(httpService: HttpService) {
    super(httpService, '/frame-glasses', 3000);
  }

  parseOne(object): FrameGlass {
    let id = object.id;
    let name = object.name;
    let description = object.description;
    let m2Price = object.m2Price;
    return new FrameGlass(id, name, description, m2Price);
  }

  parseArray(array: {_embedded: {"frame-glasses": object[]}}): FrameGlass[] {
    return array._embedded["frame-glasses"].map(object => this.parseOne(object));
  }

}

export class FrameGlass extends Product {
  m2Price: number;

  constructor(id: string, name: string, description: string, m2Price: number) {
    super(id, name, description);
    this.m2Price = m2Price;
  }
}
