export interface AuthListener {
  onAuthenticated(token: string);
  onUnauthenticated();
}