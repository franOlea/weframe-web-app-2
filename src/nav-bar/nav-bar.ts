import { inject } from 'aurelia-framework';
import { UserService } from '../api/user-service';
import { AuthService } from '../api/auth/auth-service';

@inject(UserService, AuthService)
export class NavBar {

  private authenticated: boolean;
  private user;

  constructor(private readonly userService: UserService, 
              private readonly authService: AuthService) {
  }

  created(): void {
    if(this.isAuthenticated()) {
      this.authenticated = true;
      this.getCurrentUser();
    } else {
      this.authenticated = false;
      this.user = null;
    }
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  private isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUserData().then(
      success => {
        this.user = success;
        console.log(this.user);
      },
      failure => {
        console.error(failure);
    });
  }

}
