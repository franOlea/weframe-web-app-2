export class AuthStateChangeEvent {

  constructor(private readonly authenticated: boolean, private readonly token: string) {};
}