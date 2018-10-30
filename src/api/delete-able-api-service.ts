import { ApiService } from './api-service';
import { HttpService } from './http/http-service';

export abstract class DeleteAbleApiService<T> extends ApiService<T> {

  constructor(httpService: HttpService, entityPath: string, timeout: number = 3000) {
    super(httpService, entityPath, timeout);
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {
      this.httpService.request(`${this.entityPath}/${id}`)
        .asDelete()
        .withTimeout(this.timeout)
        .send()
        .then(success => {
          if(success.statusCode == 200) {
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
