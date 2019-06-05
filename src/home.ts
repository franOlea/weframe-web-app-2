import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserService} from "./api/user-service";
import {WebAuth} from "auth0-js";

@inject(UserService, Router, WebAuth)
export class Home {

  constructor(private readonly userService : UserService, private readonly router : Router, private readonly auth0: WebAuth) {}

  created() {

  }

  start() {
    if(this.userService.isAuthenticated()) {
      this.router.navigate("purchase-menu");
    } else {
      this.auth0.authorize();
    }
  }

}
