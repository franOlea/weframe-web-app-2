import { HttpService } from './http/http-service';
import {Page, PagedResponseEntity} from "./response/response-entity";

export abstract class ApiService<T extends Entity> {

  constructor(protected readonly httpService: HttpService, 
              protected readonly entityPath: string, 
              protected readonly timeout: number = 60000,
              protected readonly parser: ApiParser<T>) {}

  get(page: number = 0, size: number = 10) : Promise<PagedResponseEntity<T[]>> {
    return new Promise((resolve, reject) => {
      this.httpService.request(this.entityPath)
        .asGet()
        .withTimeout(this.timeout)
        .withParams({page: page, size: size})
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

  getById(id: number) : Promise<T> {
    return new Promise((resolve, reject) => {
      this.httpService.request(`${this.entityPath}/${id}`)
        .asGet()
        .withTimeout(this.timeout)
        .send()
        .then(success => {
          if (success.statusCode == 200) {
            resolve(this.parser.parseOne(JSON.parse(success.response)));
          } else {
            console.error(success);
            reject(success);
          }
        }, failure => {
          console.error(failure);
          reject(failure);
        });

    })
  }

  post(entity: T) : Promise<T> {
    return new Promise((resolve, reject) => {
      this.httpService.request(`${this.entityPath}`)
        .asPost()
        .withTimeout(this.timeout)
        .withContent(entity)
        .send()
        .then(success => {
          if (success.statusCode == 201 || success.statusCode == 200) {
            resolve(this.parser.parseOne(JSON.parse(success.response)));
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

  patch(entity: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.httpService.request(`${this.entityPath}/${entity.id}`)
        .asPatch()
        .withTimeout(this.timeout)
        .withContent(entity)
        .send()
        .then(success => {
          if (success.statusCode == 201 || success.statusCode == 200) {
            resolve(this.parser.parseOne(JSON.parse(success.response)));
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

  protected parsePage(response: any) {
    return new Page(
      response.page.size,
      response.page.totalElements,
      response.page.totalPages,
      response.page.number);
  }
}

export interface ApiParser<T extends Entity> {
  parseOne(object: any): T;
  parseArray(array: any): T[];
}

export abstract class Entity {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

}