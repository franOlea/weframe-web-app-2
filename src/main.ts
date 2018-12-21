import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import * as auth0 from 'auth0-js';

import environment from './environment';

import {AuthService} from './api/auth/auth-service';
import {HttpService} from './api/http/http-service';
import {UserService} from './api/user-service';

import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';

import {EventAggregator} from 'aurelia-event-aggregator';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-toolbelt'))
    .feature(PLATFORM.moduleName('resources/index'));


  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
      aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  const auth0 = getAuth0();
  const httpClient = getHttpClient();
  const httpService = new HttpService(httpClient);
  const authService = new AuthService(auth0, httpService, aurelia.container.get(EventAggregator));
  const userService = new UserService(httpService);
  authService.initialize();

  aurelia.container.registerSingleton(HttpService, () => {
    return httpService;
  });

  aurelia.container.registerSingleton(AuthService, () => {
    return authService;
  });

  aurelia.container.registerSingleton(UserService, () => {
    return userService;
  });

  return aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
  
}



function getAuth0(): auth0.WebAuth {
  return new auth0.WebAuth({
    domain: environment.auth0Domain,
    clientID: environment.auth0ClientID,
    redirectUri: environment.auth0RedirectUri,
    audience: environment.auth0Audience,
    responseType: environment.auth0ResponseType,
    scope: environment.auth0Scope
  });
}

function getHttpClient(): HttpClient {
  return new HttpClient().configure(configuration => {
    configuration.withBaseUrl(environment.webApiUrl);
    configuration.withCredentials(true);
  });
}
