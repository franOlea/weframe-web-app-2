export default {
  debug: false,
  testing: false,
  auth0Domain: 'weframe.auth0.com',
  auth0ClientID: 'T4odJUBxMAikG5P6sEaq7wk5OqdabVYL',
  auth0RedirectUri: 'http://localhost:9000/callback',
  auth0Audience: 'http://localhost:8080',
  auth0ResponseType: 'token id_token',
  auth0Scope: 'roles',
  //webApiUrl: "http://localhost:8080",
  webApiUrl: "http://kotlin-resources-server.sa-east-1.elasticbeanstalk.com",
  tokenStateEvent: "tokenStateEvent",
  authStateEvent: "authStateEvent",
  newAuthStateEvent: "newAuthStateEvent",
  canvasSelectorChangeEvent: "canvas-selector-change",
  httpServiceTimeout: 10000
};
