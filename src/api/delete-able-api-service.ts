import {ApiParser, ApiService, Entity} from './api-service';
import { HttpService } from './http/http-service';

export abstract class DeleteAbleApiService<T extends Entity> extends ApiService<T> {

  constructor(httpService: HttpService, entityPath: string, timeout: number, apiParser: ApiParser<T>) {
    super(httpService, entityPath, timeout, apiParser);
  }

  remove(id: number, progressCallback: (progressEvent) => any = (_) => {}) {
    return new Promise((resolve, reject) => {
      this.httpService.request(`${this.entityPath}/${id}`, progressCallback)
        .asDelete()
        .withTimeout(this.timeout)
        .send()
        .then(success => {
          if(success.statusCode == 200 || success.statusCode == 204) {
            resolve();
          } else {
            reject(success);
          }
        }, failure => {
          console.error(failure);
          reject(failure);
        });

    })
  }

}
