import {inject} from 'aurelia-framework';
import {HttpClient, RequestBuilder} from 'aurelia-http-client';

import {AuthListener} from '../auth/auth-listener';
import environment from "../../environment";

@inject("HttpClient")
export class HttpService implements AuthListener {

  private token: string;

  constructor(private httpClient: HttpClient) {
    this.httpClient = this.createUnauthenticatedClient();
  }

  request(path): RequestBuilder {
    const _self = this;
    return this.httpClient.createRequest(path)
      .withInterceptor({
        request(request) {
          if(_self.token != null) {
            request.headers.add('Authorization', `Bearer ${_self.token}`);
          }
          return request;
        }
      })
      .withInterceptor({
          response(response) {
            console.log(`${response.requestMessage.method} ${response.requestMessage.buildFullUrl()} ${response.statusCode}`);
            return response;
          }
      });
  }

  onAuthenticated(token: string): void {
    this.token = token;
  }
  onUnauthenticated(): void {
    this.token = null;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  protected authenticationChanged(authChange) {
    if(authChange.authenticated) {
      console.log("Authenticated, created http client with access token.");
      this.httpClient = this.createAuthenticatedClient(authChange.accessToken);
    } else {
      console.log("Logged out, created default http client.");
      this.httpClient = this.createUnauthenticatedClient();
    }
  }

  private createUnauthenticatedClient(): HttpClient {
    return new HttpClient()
      .configure(configuration => {
        configuration.withBaseUrl(environment.webApiUrl);
      });
  }

  private createAuthenticatedClient(accessToken): HttpClient {
    return new HttpClient()
      .configure(configuration => {
        configuration.withBaseUrl(environment.webApiUrl);
        configuration.withCredentials(true);
        configuration.withHeader('Authorization', `Bearer ${accessToken}`);
      });
  }
}
