import {Entity} from "../api/api-service";

export abstract class Product extends Entity {
  name : string;
  description : string;
  deleted : boolean;

  constructor(id: number, name: string, description: string, deleted: boolean = false) {
    super(id);
    this.name = name;
    this.description = description;
    this.deleted = deleted;
  }
}
