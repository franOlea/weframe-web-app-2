import { WebAuth } from 'auth0-js';

import { AuthListener } from './auth-listener';

export class AuthService {

  constructor(private readonly auth0: WebAuth,
              private readonly listener: AuthListener) {
    console.log("constructed auth service")}

  login(): void {
    console.log("Loging in.");
    this.auth0.authorize();
  }

  logout(): void {
    console.log("Loging out.");
    this.deleteToken();
    this.listener.onUnauthenticated();
    location.reload(true);
  }

  handleAuthentication(): Promise<void> {
    return new Promise((resolve) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          console.log(authResult);
          this.persistToken(authResult);
          this.listener.onAuthenticated(authResult.accessToken);
          console.log("Login successful for user " + authResult.idTokenPayload.sub);
          resolve();
        } else if (err) {
          console.error(err);
          this.listener.onUnauthenticated();
          resolve();
        } else {
          console.error("Login unsuccessful with unknown error.");
          this.listener.onUnauthenticated();
          resolve();
        }
      });
    });
  }

  initialize(): void {
    console.debug("Initializing auth service.");
    if (this.hasExpiredToken()) {
      console.debug("Expired token, calling listener for no authentication.");
      this.listener.onUnauthenticated();
    } else {
      console.debug("Valid token present, loading token.");
      const token = this.loadToken();
      console.debug("Token loaded, calling listener for authentication.");
      this.listener.onAuthenticated(token.accessToken);
    }
  }

  private persistToken(authResult): void {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    console.debug("Token persisted.");
  }

  private deleteToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    console.debug("Token deleted.");
  }

  private loadToken(): any {
    return {
      accessToken: localStorage.getItem('access_token'),
      idToken: localStorage.getItem('id_token')
    };
  }

  private hasExpiredToken(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() > expiresAt;
  }

}
