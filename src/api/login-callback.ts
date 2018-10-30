import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from './auth/auth-service';

@inject(AuthService, Router)
export class Callback {

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  created() {
    console.log("Calling auth handler");
    this.auth.handleAuthentication().then(() => {
      console.log("Redirecting home");
      this.router.navigate("home")
    });
  }
  
}