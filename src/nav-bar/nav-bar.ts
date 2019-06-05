import { inject } from 'aurelia-framework';
import { UserService } from '../api/user-service';
import { AuthService } from '../api/auth/auth-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

@inject(UserService, AuthService, EventAggregator, Router)
export class NavBar {

  private authenticated: boolean;
  private user: string;
  private admin: boolean;


  constructor(private readonly userService: UserService, 
              private readonly authService: AuthService,
              private readonly eventAggregator: EventAggregator,
              private readonly router: Router) {
    this.eventAggregator.subscribe("auth-state-change-event", event => {
      this.checkAuthenticationState();
    });
  }

  created(): void {
    this.checkAuthenticationState();
  }

  private checkAuthenticationState() {
    if (this.isAuthenticated()) {
      this.authenticated = true;
      this.getCurrentUser();
      this.getUserRole();
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
    this.router.navigate("home");
    location.reload(true);
  }

  private isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  getCurrentUser(): void {
    this.user = this.userService.getUserName();
  }

  private getUserRole() {
    this.admin = this.userService.getUserRole() == "ROLE_ADMIN";
  }

}
