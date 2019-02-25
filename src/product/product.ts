import {Entity} from "../api/api-service";

export abstract class Product extends Entity {
  name : string;
  description : string;

  constructor(id: number, name: string, description: string) {
    super(id);
    this.name = name;
    this.description = description;
  }
}
