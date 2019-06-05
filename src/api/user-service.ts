import { HttpService } from "./http/http-service"
import * as JWT from 'jwt-decode';

export class UserService {

    constructor(private readonly httpService: HttpService){};



    getCurrentUserData(): Promise<any> {
        this.getUserRole();
        return new Promise((resolve, reject) => {
            this.httpService.request("/users/me")
                .asGet()
                .send()
                .then(success => {
                  console.log(success);
                  if(success.statusCode == 200) {
                      resolve(JSON.parse(success.response));
                  } else {
                      reject(success);
                  }
                }, failure => {
                    reject(failure);
                });
        });
    }

    isAuthenticated(): boolean {
        return this.httpService.isAuthenticated();
    }

    getUserRole(): string {
      if(this.httpService.token != null) {
        let token = JWT(this.httpService.token);
        return token.scope;
      } else {
        return null;
      }
    }

    getUserName(): string {
      if(this.httpService.token != null) {
        let token = JWT(this.httpService.token);
        return token['https://email'];
      } else {
        return null;
      }
    }

}
