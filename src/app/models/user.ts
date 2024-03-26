export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public remember_token: string,
    public email_verified_at: Date
  ) {}
}
