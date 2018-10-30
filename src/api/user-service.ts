import { HttpService } from "./http/http-service";

export class UserService {

    constructor(private readonly httpService: HttpService) {
      console.log("constructed user service")
    }

    getCurrentUserData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpService.request("/users/me")
                .asGet()
                .send()
                .then(success => {
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

}
